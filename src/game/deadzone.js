var placesDeadZone = [{ x: 100, y: 90 },
    { x: 68, y: 185 },
    { x: 36, y: 281 },
    { x: 4, y: 377 },
    { x: 335, y: 90 },
    { x: 367, y: 185 },
    { x: 399, y: 281 },
    { x: 431, y: 377 }
];

var DeadZone = function(place) {
    this.x = placesDeadZone[place].x;
    this.y = placesDeadZone[place].y;
    this.w = 10;
    this.h = 65;
}

DeadZone.prototype = new Sprite();
DeadZone.prototype.type = OBJECT_DEADZONE;

DeadZone.prototype.step = function() {
    var collision = this.board.collide(this, OBJECT_BEER);
    if(collision){
        collision.hit();
    }
};

DeadZone.prototype.draw = function(ctx) {
    ctx.fillStyle = '#007D01';
    ctx.fillRect(this.x, this.y, this.w, this.h);
};