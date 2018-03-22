/**
 * Los diversos tipos de objetos.
 */
var OBJECT_PLAYER = 1,
    OBJECT_BEER = 2,
    OBJECT_CLIENT = 4,
    OBJECT_DEADZONE = 8,
    OBJECT_ENEMY = 16,
    OBJECT_ENEMY_PROJECTILE = 32,
    OBJECT_POWERUP = 64;

/** 
 * Situaciones iniciales donde se generan los clientes
 */
var initPlaceClient = [{ x: 120, y: 79 },
    { x: 90, y: 175 },
    { x: 60, y: 271 },
    { x: 30, y: 367 }
];

/**
 * Instancia de un cliente según unos parámetros
 * @param {Number} place Posición del array 'initPlaceClient'ñ
 * @param {Number} v     Velocidad del cliente
 */
var ClientInstance = function(place, v){
    return new Client(initPlaceClient[place].x,initPlaceClient[place].y, v);
}

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
    var board = new GameBoard()

    board.add(new Player());
    for (var i = 0; i < placesDeadZone.length; ++i) {
        board.add(new DeadZone(i));
    }

    GameManager.initialize();

    board.add(new Spawner(ClientInstance(0, 0.5), 5, 3, 2));
    board.add(new Spawner(ClientInstance(1, 0.5), 2, 2.5, 3));
    board.add(new Spawner(ClientInstance(2, 0.5), 4, 5, 1));
    board.add(new Spawner(ClientInstance(3, 0.5), 7, 4, 6));

    

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

window.addEventListener("load", function() {
    Game.initialize("game", sprites, playGame);
});