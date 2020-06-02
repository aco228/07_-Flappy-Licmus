function Sunce(){

	this.slika_sunce = NaN;
	this.slika_prelaz = NaN;
	this.podeseno = false;

	this.brzina = 0.15;
	this.ugao = 0;

	this.x = 0;
	this.y = 0;


	this.update = function(delta){
		if(!this.podeseno) this.init();
		this.ugao += this.brzina;
	}
	this.init = function(){
		this.slika_sunce = rSunce;
		this.slika_prelaz = rPrelaz;
		this.x = 0-(this.slika_sunce.width/2);
		this.y = 0-(this.slika_sunce.height/2);
		this.podeseno = true;
	}
	this.crtaj = function(){
		if(!this.podeseno) return;
		
		ctx.save();
		ctx.translate(ctx.width, ctx.height);
		ctx.rotate(this.ugao * Math.PI / 180);
		ctx.drawImage(this.slika_sunce, this.x, this.y);
		ctx.restore();
		ctx.drawImage(rPrelaz, 0, 0);
	}
}