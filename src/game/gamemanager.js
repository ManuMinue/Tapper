

var GameManager = new function() {
	var clientes;
	var jarrasVacias;
	var jarrasLlenas;


	/**
	*	Inicializamos el objeto
	*	@param  {int}    numClientes  Indica el número inicial de clientes
	*/
	this.initialize = function() {
		this.clientes = 0;
		this.jarrasVacias = 0;
		this.jarrasLlenas = 0;
	}

	this.addClients = function(numClientes) {
		this.clientes += numClientes;
	}

	this.serveBeer = function() {
		++this.jarrasLlenas;

		console.log(this.jarrasLlenas);
	}

	this.drinkBeer = function() {
		--this.jarrasLlenas;
		++this.jarrasVacias;

		--this.clientes;
	}

	this.removeBeer = function() {
		--this.jarrasVacias;
	}

}