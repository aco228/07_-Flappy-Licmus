function OblakLista() {
	this.lista = [];

	this.init = function(prvi_element){
		this.brisanje();
		if(prvi_element){
			this.lista.push(new Oblak());
			this.lista[0].prvi();
		}
	};

	this.brisanje = function(){
		while(this.lista.length>0) this.lista.pop();
	};

	this.update = function(){
		// Brisanje neakttivnih oblaka
		for(var i = this.lista.length-1; i >= 0; i--){
			if(this.lista[i].getBrisanje()) this.lista.splice(i, 1);
		} 

		// Dodavanje novih oblaka ukoliko je slucajni broj 5 i nema vise od 15 oblaka trenutno
		var broj = Math.floor(Math.random()*(500-0+1)+0);
		if(broj==5 && this.lista.length <= 15) this.lista.push(new Oblak(ctx)); 

		// Update
		for(var j = 0; j < this.lista.length; j++) 
			this.lista[j].update();

	};

	this.crtaj = function(){
		for(var i = 0; i < this.lista.length; i++) {
			this.lista[i].crtaj();
		}
	};

};

function Oblak() {

	this.slika;
	this.x = canvas.width;
	this.y = 0;
	this.brzina = 0.2;
	this.podeseno = false;
	this.brisanje = false;


	this.init = function(){
		// Odabir slike
		this.podeseno = true;
		var brSlika = Math.floor(Math.random()*(4-1+1)+1);
		switch(brSlika){
			case 1: this.slika = rOblak1; break;
			case 2: this.slika = rOblak2; break;
			case 3: this.slika = rOblak3; break;
			case 4: this.slika = rOblak4; break;
		}



		// Podesavanje pozicije
		this.y = Math.floor(Math.random()*(516-83+1)+83);
	}
	this.update = function(){
		if(!this.podeseno) this.init();
		this.x -= this.brzina * gl_DELTA;
		if(this.x < 0-this.slika.width) this.brisanje = true;
	}

	this.crtaj = function() { ctx.drawImage(this.slika, this.x, this.y); }
	this.getBrisanje = function() { return this.brisanje; }
	this.prvi = function() { this.x = 96; } // prvi oblak koji se dodaje
}