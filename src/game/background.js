/*Objeto que establece el fondo del juego*/
var Background = function() {
    this.setup('TapperGameplay');

    this.x = 0;
    this.y = 0;

    this.step = function() {}
}

Background.prototype = new Sprite();
