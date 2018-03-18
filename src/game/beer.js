var STATUS = {
    FULL: { value: 0, name: "Jarra llena", code: "F", sprite: 'Beer' },
    EMPTY: { value: 1, name: "Jarra vacía", code: "E", sprite: 'Glass' }
};

var Beer = function(status, x, y, v) {
    /*------------------------ATRIBUTOS----------------------*/
    this.setup(status.sprite, { status: status, reloadTime: 0.25, speed: v });

    this.x = x;
    this.y = y;

    this.move = function() {
        (this.status == STATUS.FULL) ? this.x -= this.speed: this.x += this.speed;
    }
};

Beer.prototype = new Sprite();
Beer.prototype.type = OBJECT_BEER;

Beer.prototype.step = function(dt) {
    this.move();
    var collision;
    switch (this.status) {
        case STATUS.FULL:
            collision = this.board.collide(this, OBJECT_CLIENT);
            break;
        case STATUS.EMPTY:
            collision = this.board.collide(this, OBJECT_PLAYER);
            break;
    }
    if (collision) {
        collision.hit();
        this.board.remove(this);
    } else if (this.x < 0) {
        this.board.remove(this);
    }
};