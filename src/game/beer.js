var Beer = function(x, y, v) {
    /*------------------------ATRIBUTOS----------------------*/
    this.setup('Beer', { reloadTime: 0.25, speed: v });

    this.x = x;
    this.y = y;
};

Beer.prototype = new Sprite();
Beer.prototype.type = OBJECT_BEER;

Beer.prototype.step = function(dt) {
    this.x -= this.speed;

    var collision = this.board.collide(this, OBJECT_CLIENT);
    if (collision) {
        collision.hit();
        this.board.remove(this);
    } else if (this.x < 0) {
        this.board.remove(this);
    }
}; 