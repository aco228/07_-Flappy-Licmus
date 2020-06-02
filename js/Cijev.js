function CijevLista(){

	this.lista = [];
	
	this.predhodniBrojBodova; // Koristi se za povecavanje brzine kretanja
	this.brojZaUbrzanje = 5; // Nakon koliko ce se vrsiti ubrzanje kretanja cijevi
	this.brzinaUbrzavanja = 0.2; // Brzina za koju se povecava brzina kretanja
	this.brzina = 1.2; // Brzina kretanja cijevi
	this.pozicija = 0; // Pozicija poslednje cijevi
	this.razmak = 350; // Razmak izmedju dvije cijevi
	this.uKoaliziji = false;
	this.povecanaBrzina = false;

	this.init = function(prvi_element){
		this.brisanje();
		this.pozicija = canvas.width;
		this.predhodniBrojBodova = 0;
		this.brzina = 1.2;

		if(prvi_element) {
			this.lista.push(new Cijev(this.pozicija, this.brzina));
			this.lista[0].prvi();
		}
	};

	this.brisanje = function(){
		while(this.lista.length>0) this.lista.pop();
	};

	this.getKoalizija = function() { return this.uKoaliziji; }

	this.update = function(licmusY){
		this.uKoaliziji = false;

		// Provjera za ubrzavanje
		if(REZULTAT-this.predhodniBrojBodova==this.brojZaUbrzanje){
			this.brzina += this.brzinaUbrzavanja
			this.predhodniBrojBodova = REZULTAT;
			this.povecanaBrzina = true;
		}

		//Brisanje neaktivnih cijevi
		for(var i=this.lista.length-1; i>=0; i--){
			if(this.lista[i].getBrisanje()) this.lista.splice(i, 1);
		}  

		//Provjera da li je moguce kreirati novu cijev
		this.pozicija -= this.brzina * gl_DELTA;
		if(this.pozicija <= canvas.width-this.razmak){
			if(this.povecanaBrzina) { this.pozicija = canvas.width + rCijev.width; this.povecanaBrzina = false; }
			else                    this.pozicija = canvas.width;

			this.lista.push(new Cijev(this.pozicija, this.brzina));
		}

		// Update cijevi
		for(var j=0; j<this.lista.length; j++){
			var koalizija = this.lista[j].update(licmusY);
			if(koalizija=='da'){
				if(PRENTE>0){
					this.uKoaliziji = true;
					if(PRENTE==1) $('#prenta1').hide(); else $('#prenta2').hide();
					PRENTE--;
				} else splash_screen(true); // kraj 
			} else if(koalizija=='vec_se_nalazi') this.uKoaliziji = true;
		}
	};

	this.crtaj = function(){
		for(var i = 0; i < this.lista.length; i++) {
			this.lista[i].crtaj();
		}
	};

};

function Cijev(inx, inbrzina){

	this.brzina = inbrzina;

	this.podesenaVisina = false;

	this.x = inx;
	this.y = 0;

	this.brisanje = false;

	this.prostorZaProlazak = 229;
	this.licmusX = 20;
	this.nePovecavajRezultat = false; // Ukoliko ponovo provjerava koaliziju, da ne povecava rezultat
	this.nalaziSeUKoaliziji = false;

	this.prenta = NaN; // Dodatak za zivot
	this.prenta_postoji = false;



	this.crtaj = function(){
		ctx.drawImage(rCijev, this.x, this.y); 
		if(this.prenta_postoji) this.prenta.crtaj(this.x, this.y);
		//this.crtajKoaliziju();
	};
	this.crtajKoaliziju = function(){
		ctx.beginPath();
		ctx.rect(this.x+9,this.y+323,rCijev.width-12,229);
		if(this.xProba) ctx.strokeStyle = "#FF0000";
		if(this.yProba) ctx.strokeStyle = "#FFFF00";
		ctx.stroke();
		ctx.strokeStyle = "#000";
	}

	this.update = function(licmusY){
		if(!this.podesenaVisina) this.podesiVisinu();
		this.x -= this.brzina * gl_DELTA;
		if(this.x < 0 - rCijev.width) this.brisanje = true;

		return this.koalizija(licmusY-5);
	};

	this.podesiVisinu = function(){
		this.podesenaVisina = true;
		this.y = 0-Math.floor(Math.random()*(289-0));

		// Provjera da li treba da kreira Prentu
		if(PRENTE == 2 || this.prenta_postoji) return;
		var broj = Math.floor(Math.random()*(25-0+1)+0);
		if(broj==5) { this.prenta = new Prenta(); this.prenta_postoji = true; }
	};

	this.getBrisanje = function(){
		return this.brisanje;
	};
	this.getX = function(){ return this.x; };

	this.xProba = false; this.yProba = false; // Za crtanje boje koalizije

	this.koalizija = function(licmusY){
		if(this.nePovecavajRezultat) return 'ne';

		var lX = this.licmusX+34; var lW = 54; // x kordinanta i width
		var lY = licmusY + 13; var lH = 50;    // y kordinanta i height

		var pX = this.x+9; var pW = rCijev.width-12; // Prepreka sa dodacima zbog sjenke da bi bilo tacno

		// Provjera da li se nalazi ispod cijevi
		if(lX >= pX && lX <= (pX+pW) || (lX+lW) >= pX && (lX+lW) <= (pX+pW)){
			var pY = this.y + 323 - 5; var pH = 229 + 5; // y kordinanta prolaza (323 je velicina jedne cijevi, a 229 velicina prolaza) a 5 je tolerancija

			if(this.nalaziSeUKoaliziji) return 'vec_se_nalazi'; // ukoliko se vec nalazi u koaliziji (iskoristio zivot);

			// Provjera da li se nalazi van slobodnog prostora
			if(lY <= pY || lY >= (pY+pH))           { this.nalaziSeUKoaliziji = true; z_playUdarac();  return 'da'; }
			if((lY+lH) <= pY || (lY+lH) >= (pY+pH)) { this.nalaziSeUKoaliziji = true; z_playUdarac();  return 'da'; }

			if(this.prenta_postoji){
				// Provjera da li je korisnik pokupio novi zivot
				var linija_gdje_se_nalazi_prenta = pX + (pW/2);
				if((lX+lW) >= linija_gdje_se_nalazi_prenta){
					z_playPrenta();
					PRENTE++; if(PRENTE==1) $('#prenta1').show(); else $('#prenta2').show();
					this.prenta_postoji = false;
				}
			}

			this.yProba = true;
			var linijaProlaza = pX + pW - 10; // Linija nakon koje se dobijaju bodovi
			if((lX+lW) >= linijaProlaza){
				REZULTAT+=1; $('#bodovi').text(REZULTAT);
				this.nePovecavajRezultat = true;
			}
			return 'ne';
		}
		this.xProba = false;
		return 'ne';
	}

	this.prvi = function(){
		this.prenta = new Prenta(ctx);
		this.prenta_postoji = true;
	}
};