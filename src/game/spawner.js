var Spawner = function(numClients, freq, delay) {
    this.numClients = numClients;
    this.frequency = freq;
    this.delay = delay;
}


Spawner.prototype = new Sprite();

Spawner.prototype.draw = function(ctx) {}

Spawner.prototype.step = function(dt) {
	
}