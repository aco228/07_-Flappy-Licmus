function Prenta(inctx){
	this.slika = NaN;
	this.podeseno = false;

	this.crtaj = function(inx, iny){
		if(!this.podeseno) { this.slika = rPrenta; this.podeseno = true; }

		ctx.drawImage(this.slika, inx+11, iny+379); // Podesava na pravu vrijednost
	};
};