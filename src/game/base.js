/*Sprites que utilizaremos en el juego*/
var sprites = {
	Beer:{			sx: 512,	sy: 99,		w: 23,	h: 32,	frames: 1},
	Glass:{			sx: 512,	sy: 131,	w: 23,	h: 32,	frames: 1},
	NPC:{			sx: 512,	sy: 66,		w: 33,	h: 33,	frames: 1},
	ParedIzda:{		sx: 0,		sy: 0,		w: 512,	h: 480,	frames: 1},
	Player:{ 		sx: 512,	sy: 0,		w: 56,	h: 66,	frames: 1},
	TapperGameplay:{sx: 0,		sy: 480,	w: 512,	h: 480,	frames: 1}
};

/*Objeto que establece el fondo del juego*/
var Fondo = function() {
  this.setup('TapperGameplay');

  this.x = 0;
  this.y = 0;

  this.step = function() {

  }
}

Fondo.prototype = new Sprite();