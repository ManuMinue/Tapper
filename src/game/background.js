/**
 * Clase que representa al fonde del juego.
 */
var Background = function() {
    /*------------------------ATRIBUTOS----------------------*/
    this.setup('TapperGameplay');

    this.x = 0;
    this.y = 0;
}

/*-----------------------PROTOTIPO---------------------*/
/**
 * Definimos que hereda de la clase Sprite.
 */
Background.prototype = new Sprite();

/*-----------------------MÉTODOS PROTOTIPO---------------------*/
/**
 * Ejecuta un paso del fondo. En este caso, no se realiza ninguna acción
 */
Background.prototype.step = function() {}