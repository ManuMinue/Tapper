
var Player = function() {
  var moves = new Array({x:325, y:90},
                      {x:357, y:185},
                      {x:389, y:281},
                      {x:421, y:377})
  var place = 0;
  var teclaPulsada = false;

  this.setup('Player', { x: 325, y: 90 });

  this.step = function(dt) {

    if(!teclaPulsada && Game.keys['up']) { 
      this.move(-1);
    }
    else if(!teclaPulsada && Game.keys['down']) { 
      this.move(1);
    }
    else {
      teclaPulsada = false;
    }
  };

  this.move = function(num){
    if(num == -1 && place == 0){
      place = moves.length;
    }
    else if(num == 1 && place == moves.length -1){
      place = -1;
    }
    place += num;
    this.x = moves[place].x;
    this.y = moves[place].y;
    teclaPulsada = true;
  }
};

Player.prototype = new Sprite();
Player.prototype.type = OBJECT_PLAYER;

Player.prototype.hit = function(damage) {
  if(this.board.remove(this)) {
    loseGame();
  }
};