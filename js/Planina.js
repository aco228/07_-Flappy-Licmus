function PlaninaLista(){

	this.lista = [];

	this.init = function(prvi_element){
		this.brisanje();
		if(prvi_element){
			this.lista.push(new Planina());
			this.lista[0].prvi();
		}
	};

	this.brisanje = function(){
		while(this.lista.length>0) this.lista.pop();
	};

	this.update = function(){
		// Brisanje neaktivnih planina
		for(var i = this.lista.length-1; i >= 0; i--){
			if(this.lista[i].getBrisanje()) this.lista.splice(i, 1);
		} 

		// Dodavanje novih oblaka ukoliko je slucajni broj 5 i nema vise od 15 oblaka trenutno
		var broj = Math.floor(Math.random()*(500-0+1)+0);
		if(broj==5 && this.lista.length <= 3) this.lista.push(new Planina(ctx)); 

		// Update sve planine
		for(var k = 0; k < this.lista.length; k++) 
			this.lista[k].update();
	};

	this.crtaj = function(){
		for(var k = 0; k < this.lista.length; k++) 
			this.lista[k].crtaj();
	};

};

function Planina(){
	
	this.brisanje = false;
	this.podeseno = false;

	this.x = canvas.width;
	this.y = 0;
	this.brzina = 0.1;

	this.update = function(){
		if(this.brisanje) return;
		if(!this.podeseno) this.init();
		this.x -= this.brzina*gl_DELTA;
	};
	this.init = function(){
		this.y = Math.floor(Math.random()*(547-487+1)+487); // izmedju 487 i 547
		this.podeseno = true;
	};
	this.crtaj = function(){
		if(this.brisanje || !this.podeseno) return;
		ctx.drawImage(rPlanina, this.x, this.y);
	};
	this.getBrisanje = function(){
		return this.brisanje;
	};

	this.prvi = function() {this.x = 229; this.init(); } // Prvi oblak koji se dodaje
}