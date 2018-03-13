/*Objeto que establece el fondo del juego*/
var Fondo = function() {
 	this.setup('TapperGameplay');

	this.x = 0;
	this.y = 0;

	this.step = function() {}
}

Fondo.prototype = new Sprite();