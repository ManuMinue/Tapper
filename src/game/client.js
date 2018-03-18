

var Client = function(x, y, v) {
    /*------------------------ATRIBUTOS----------------------*/
    this.setup('NPC', { reloadTime: 0.25, speed: v });

    this.x = x;
    this.y = y;

    this.widthGlass = sprites.Glass.w;
    this.glassInstance = new Beer(STATUS.EMPTY, this.x + this.widthGlass, this.y, 2);
};

Client.prototype = new Sprite();
Client.prototype.type = OBJECT_CLIENT;

Client.prototype.step = function(dt) {
    this.x += this.speed;
};

Client.prototype.hit = function(damage) {
    var glass = Object.create(this.glassInstance);
    glass.x = this.x + this.widthGlass;
    glass.y = this.y;

    this.board.add(glass);
    this.board.remove(this);
}