/** 
 * Situaciones iniciales donde se generan los clientes
 */
var initPlaceClient = [{ x: 120, y: 79 },
    { x: 90, y: 175 },
    { x: 60, y: 271 },
    { x: 30, y: 367 }
];


var Spawner = function(place, numClients, freq, delay) {
    this.numClients = numClients;
    this.frequencyTime = freq;
    this.frequency = freq;
    this.delay = delay;
    this.place = place;

    this.clientInstance = new Client(initPlaceClient[this.place].x, initPlaceClient[this.place].y, 1);
}

Spawner.prototype = new Sprite();

Spawner.prototype.draw = function(ctx) {

}

/**
* Genera un nuevo cliente en función de la frecuencia
*/
Spawner.prototype.step = function(dt) {
	/**
     * Se resta el tiempo transcurrido
     */
    this.delay -= dt;
    
    if (this.delay < 0 && this.numClients > 0) {
    	this.frequency -= dt;
    	if (this.frequency < 0) {
    		this.frequency = this.frequencyTime;

    		var cliente = Object.create(this.clientInstance);

    		this.board.add(cliente);
    		--this.numClients;
    	}
    }
}