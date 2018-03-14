var Player = function() {

    /*------------------------ATRIBUTOS----------------------*/
    this.setup('Player', {breakTime: 0.25});
    this.moves = [{ x: 325, y: 90 },
        { x: 357, y: 185 },
        { x: 389, y: 281 },
        { x: 421, y: 377 }
    ];
    this.place = 0;

    this.x = this.moves[this.place].x;
    this.y = this.moves[this.place].y;

    this.break = this.breakTime;

    /*------------------------MÉTODOS PÚBLICOS---------------*/
    this.step = function(dt) {

        this.break -= dt;

        if (Game.keys['up']) {
            this.move(-1);
        } else if (Game.keys['down']) {
            this.move(1);
        } else {

        }
    };

    this.move = function(num) {
        if (this.break < 0) {
            this.break = this.breakTime;
            if (num == -1 && this.place == 0) {
                this.place = this.moves.length;
            } else if (num == 1 && this.place == this.moves.length - 1) {
                this.place = -1;
            }

            this.place += num;
            this.x = this.moves[this.place].x;
            this.y = this.moves[this.place].y;
        }

    }
};

Player.prototype = new Sprite();
Player.prototype.type = OBJECT_PLAYER;

Player.prototype.hit = function(damage) {
    if (this.board.remove(this)) {
        loseGame();
    }
};