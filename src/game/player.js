/*Posibles movimientos del jugador*/
var movesPlayer = [{ x: 325, y: 90 },
    { x: 357, y: 185 },
    { x: 389, y: 281 },
    { x: 421, y: 377 }
];

var Player = function() {

    /*------------------------ATRIBUTOS----------------------*/
    this.setup('Player', { breakTime: 0.25, reloadTime: 0.5 });

    /*Posición actual del jugador*/
    this.place = 0;

    this.x = movesPlayer[this.place].x;
    this.y = movesPlayer[this.place].y;

    /*Tiempo que tiene que pasar para que el jugador pueda moverse*/
    this.break = this.breakTime;
    this.reload = this.reloadTime;

    this.widthBeer = sprites.Beer.w;
    this.beerInstance = new Beer(STATUS.FULL, this.x - this.widthBeer, this.y, 2);

    this.clientInstance = new Client(this.x, this.y, 2);

    /*------------------------MÉTODOS-------------------------*/
    this.step = function(dt) {
        /*Restamos el tiempo transcurrido al tiempo de descanso*/
        this.break -= dt;
        this.reload -= dt;

        /*Comprobamos cuál de las teclas ha tocado*/
        if (Game.keys['up']) {
            this.move(-1);
        } else if (Game.keys['down']) {
            this.move(1);
        } else if (Game.keys['space'] && this.reload < 0) {
            this.reload = this.reloadTime;

            var beer = Object.create(this.beerInstance);
            beer.x = this.x - this.widthBeer;
            beer.y = this.y;

            var client = Object.create(this.clientInstance);
            client.x = 512 - this.x;
            client.y = this.y;

            this.board.add(beer);
            this.board.add(client);
        }
    };

    this.hit = function(damage){
        
    }

    this.move = function(num) {

        if (this.break < 0) {
            this.break = this.breakTime;

            if (num == -1 && this.place == 0) {
                this.place = movesPlayer.length - 1;
            } else if (num == 1 && this.place == movesPlayer.length - 1) {
                this.place = 0;
            } else {
                this.place += num;
            }

            /*Actualizamos la posición*/
            this.x = movesPlayer[this.place].x;
            this.y = movesPlayer[this.place].y;
        }
    };

};

Player.prototype = new Sprite();
Player.prototype.type = OBJECT_PLAYER;