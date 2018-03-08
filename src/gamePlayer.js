var Player = function() { 
  this.setup('Player', { x: 325, y: 90 });

  this.step = function(dt) {
    //diferencia entre x = 32
    //diferencia entre y = 96 (entre los dos de arriba es 95)

    if(Game.keys['up']) { 
      if(this.x == 325) {
        this.x = 421;
        this.y = 377;
      }

      else {
        this.x -= 32;
        if(this.y == 185) this.y = 90;
        else this.y -= 96;
      }
    }
    else if(Game.keys['down']) { 
      if(this.x == 421) {
        this.x = 325;
        this.y = 90;
      }

      else {
        this.x += 32;
        if(this.y == 90) this.y = 185;
        else this.y += 96;
      }
    }
    else { /*Aquí vendrá el caso de espacio*/ }
  };
};

Player.prototype = new Sprite();
Player.prototype.type = OBJECT_PLAYER;

Player.prototype.hit = function(damage) {
  if(this.board.remove(this)) {
    loseGame();
  }
};