var Client = function(x, y, v) {
    /*------------------------ATRIBUTOS----------------------*/
    this.setup('NPC', { reloadTime: 0.25, speed: v });

    this.x = x;
    this.y = y;

    /*------------------------MÉTODOS-------------------------*/
    this.step = function(dt) {
        this.x += this.speed;
    };
};

Client.prototype = new Sprite();