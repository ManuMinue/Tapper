/**
 * Clase que representa a un cliente.
 * @param {int}     x       Posición en el plano horizontal del cliente.
 * @param {int}     y       Posición en el plano vertical del cliente.
 * @param {double}  v       Velocidad con la que se desplaza el cliente.
 */
var Client = function(x, y, v) {
    /*------------------------ATRIBUTOS----------------------*/
    this.setup('NPC', { speed: v });

    this.x = x;
    this.y = y;

    this.widthGlass = sprites.Glass.w;
    this.glassInstance = new Beer(STATUS.EMPTY, this.x + this.widthGlass, this.y, 2);
};

/*-----------------------PROTOTIPO---------------------*/
/**
 * Definimos que hereda de la clase Sprite.
 */
Client.prototype = new Sprite();
/**
 * Tipo del objeto, esto servirá para que se pueda calcular las colisiones contra el objeto.
 */
Client.prototype.type = OBJECT_CLIENT;

/*-----------------------MÉTODOS PROTOTIPO---------------------*/
/**
 * Ejecuta un paso de un cliente
 * @param  {double} dt  Tiempo transcurrido entre este paso y el anterior.
 */
Client.prototype.step = function(dt) {
    this.x += this.speed;
};
/**
 * @param  {int} damage	Cantidad de daño causada.
 */
Client.prototype.hit = function(damage) {
    /**
     * Genera una jarra de cerveza vacía.
     */
    var glass = Object.create(this.glassInstance);
    glass.x = this.x + this.widthGlass;
    glass.y = this.y;

    this.board.add(glass);
    this.board.remove(this);
}