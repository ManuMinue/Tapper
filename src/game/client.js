var Client = function(x, y, v) {
    /*------------------------ATRIBUTOS----------------------*/
    this.setup('NPC', { reloadTime: 0.25, speed: v });

    this.x = x;
    this.y = y;

};

Client.prototype = new Sprite();

/*------------------------MÉTODOS-------------------------*/
Client.prototype.step = function(dt) {
    this.x += this.speed;
};

Client.prototype.hit = function() {
	this.board.remove(this);
}