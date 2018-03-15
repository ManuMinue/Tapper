var Beer = function(x, y, v) {
    /*------------------------ATRIBUTOS----------------------*/
    this.setup('Beer', { reloadTime: 0.25, speed: v });

    this.x = x;
    this.y = y;

    /*------------------------MÉTODOS-------------------------*/
    this.step = function(dt) {
        this.x -= this.speed;
    };
};

Beer.prototype = new Sprite();