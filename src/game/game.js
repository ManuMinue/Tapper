var enemies = {
    straight: { x: 0, y: -50, sprite: 'enemy_ship', health: 10, E: 100 },
    ltr: { x: 0, y: -100, sprite: 'enemy_purple', health: 10, B: 75, C: 1, E: 100, missiles: 2 },
    circle: { x: 250, y: -50, sprite: 'enemy_circle', health: 10, A: 0, B: -100, C: 1, E: 20, F: 100, G: 1, H: Math.PI / 2 },
    wiggle: { x: 100, y: -50, sprite: 'enemy_bee', health: 20, B: 50, C: 4, E: 100, firePercentage: 0.001, missiles: 2 },
    step: { x: 0, y: -50, sprite: 'enemy_circle', health: 10, B: 150, C: 1.2, E: 75 }
};

var OBJECT_PLAYER = 1,
    OBJECT_BEER = 2,
    OBJECT_CLIENT = 4,
    OBJECT_DEADZONE = 8,
    OBJECT_ENEMY = 16,
    OBJECT_ENEMY_PROJECTILE = 32,
    OBJECT_POWERUP = 64;


var startGame = function() {
    var ua = navigator.userAgent.toLowerCase();

    // Only 1 row of stars
    if (ua.match(/android/)) {
        Game.setBoard(0, new Starfield(50, 0.6, 100, true));
    } else {
        Game.setBoard(0, new Starfield(20, 0.4, 100, true));
        Game.setBoard(1, new Starfield(50, 0.6, 100));
        Game.setBoard(2, new Starfield(100, 1.0, 50));
    }
    Game.setBoard(3, new TitleScreen("Alien Invasion",
        "Press fire to start playing",
        playGame));
};

var level1 = [
    // Start,   End, Gap,  Type,   Override
    [0, 4000, 500, 'step'],
    [6000, 13000, 800, 'ltr'],
    [10000, 16000, 400, 'circle'],
    [17800, 20000, 500, 'straight', { x: 50 }],
    [18200, 20000, 500, 'straight', { x: 90 }],
    [18200, 20000, 500, 'straight', { x: 10 }],
    [22000, 25000, 400, 'wiggle', { x: 150 }],
    [22000, 25000, 400, 'wiggle', { x: 100 }]
];



var playGame = function() {
    var board = new GameBoard();
    board.add(new Player());
    for (var i = 0; i < placesDeadZone.length; ++i) {
        board.add(new DeadZone(i));
    }

    board.add(new Spawner(0, 5, 3, 2));
    board.add(new Spawner(1, 5, 2.5, 3));
    board.add(new Spawner(2, 5, 5, 1));
    board.add(new Spawner(3, 5, 4, 6));

    Game.setBoard(1, new Background());
    Game.setBoard(2, board);
    Game.setBoard(5, new GamePoints(0));
};

var winGame = function() {
    Game.setBoard(3, new TitleScreen("You win!",
        "Press fire to play again",
        playGame));
};

var loseGame = function() {
    Game.setBoard(3, new TitleScreen("You lose!",
        "Press fire to play again",
        playGame));
};

var Enemy = function(blueprint, override) {
    this.merge(this.baseParameters);
    this.setup(blueprint.sprite, blueprint);
    this.merge(override);
};

Enemy.prototype = new Sprite();
Enemy.prototype.type = OBJECT_ENEMY;

Enemy.prototype.baseParameters = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
    G: 0,
    H: 0,
    t: 0,
    reloadTime: 0.75,
    reload: 0
};

Enemy.prototype.step = function(dt) {
    this.t += dt;

    this.vx = this.A + this.B * Math.sin(this.C * this.t + this.D);
    this.vy = this.E + this.F * Math.sin(this.G * this.t + this.H);

    this.x += this.vx * dt;
    this.y += this.vy * dt;

    var collision = this.board.collide(this, OBJECT_PLAYER);
    if (collision) {
        collision.hit(this.damage);
        this.board.remove(this);
    }

    if (Math.random() < 0.01 && this.reload <= 0) {
        this.reload = this.reloadTime;
        if (this.missiles == 2) {
            this.board.add(new EnemyMissile(this.x + this.w - 2, this.y + this.h));
            this.board.add(new EnemyMissile(this.x + 2, this.y + this.h));
        } else {
            this.board.add(new EnemyMissile(this.x + this.w / 2, this.y + this.h));
        }

    }
    this.reload -= dt;

    if (this.y > Game.height ||
        this.x < -this.w ||
        this.x > Game.width) {
        this.board.remove(this);
    }
};

Enemy.prototype.hit = function(damage) {
    this.health -= damage;
    if (this.health <= 0) {
        if (this.board.remove(this)) {
            Game.points += this.points || 100;
            this.board.add(new Explosion(this.x + this.w / 2,
                this.y + this.h / 2));
        }
    }
};

var EnemyMissile = function(x, y) {
    this.setup('enemy_missile', { vy: 200, damage: 10 });
    this.x = x - this.w / 2;
    this.y = y;
};

EnemyMissile.prototype = new Sprite();
EnemyMissile.prototype.type = OBJECT_ENEMY_PROJECTILE;

EnemyMissile.prototype.step = function(dt) {
    this.y += this.vy * dt;
    var collision = this.board.collide(this, OBJECT_PLAYER)
    if (collision) {
        collision.hit(this.damage);
        this.board.remove(this);
    } else if (this.y > Game.height) {
        this.board.remove(this);
    }
};



var Explosion = function(centerX, centerY) {
    this.setup('explosion', { frame: 0 });
    this.x = centerX - this.w / 2;
    this.y = centerY - this.h / 2;
};

Explosion.prototype = new Sprite();

Explosion.prototype.step = function(dt) {
    this.frame++;
    if (this.frame >= 12) {
        this.board.remove(this);
    }
};

window.addEventListener("load", function() {
    Game.initialize("game", sprites, playGame);
});