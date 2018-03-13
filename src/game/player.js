var Player = function() {
	/*------------------------ATRIBUTOS----------------------*/
	this.moves = new Array(	{x:325, y:90},
							{x:357, y:185},
							{x:389, y:281},
							{x:421, y:377})
	this.place = 0;

	/*------------------------MÉTODOS PÚBLICOS---------------*/
	this.setup('Player', { x: this.moves[0].x, y: this.moves[0].y });

	this.step = function(dt) {

		if(!teclaPulsada && Game.keys['up']) { 
			this.move(-1);
		}
		else if(!teclaPulsada && Game.keys['down']) { 
			this.move(1);
		}
		else {

		}
	};

	this.move = function(num){
		
		if(num == -1 && place == 0){
			this.place = this.moves.length;
		}
		else if(num == 1 && place == moves.length -1){
			this.place = -1;
		}

		this.place += num;
		this.x = moves[place].x;
		this.y = moves[place].y;
	}
};

Player.prototype = new Sprite();
Player.prototype.type = OBJECT_PLAYER;

Player.prototype.hit = function(damage) {
	if(this.board.remove(this)) {
		loseGame();
	}
};