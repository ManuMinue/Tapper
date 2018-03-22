/** 
 * Situaciones iniciales donde se generan los clientes
 */
var initPlaceClient = [{ x: 120, y: 79 },
    { x: 90, y: 175 },
    { x: 60, y: 271 },
    { x: 30, y: 367 }
];

/**
 * Clase que representa a un cliente.
 * @param {int}     place   Posición del array 'initPlaceClient'.
 * @param {double}  v       Velocidad con la que se desplaza el cliente.
 */
var Client = function(place, v) {
    /*------------------------ATRIBUTOS----------------------*/
    this.setup('NPC', { speed: v });

    this.x = initPlaceClient[place].x;
    this.y = initPlaceClient[place].y;

    /**
     * Atributos que se utilizarán para generar las jarras vacías lanzadas por el cliente
     */
    this.widthGlass = sprites.Glass.w;
    this.glassInstance = new Beer(STATUS.EMPTY, this.x + this.widthGlass, this.y + 1, 2);
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
 * Ejecuta la acción al ser colisionado con otro objeto
 * @param  {int} damage	Cantidad de daño causada.
 */
Client.prototype.hit = function(damage) {
    /**
     * Genera una jarra de cerveza vacía.
     */
    var glass = Object.create(this.glassInstance);
    glass.x = this.x + this.widthGlass;
    glass.y = this.y + 1;

    this.board.add(glass);
    this.board.remove(this);
}