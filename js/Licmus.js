function Licmus(){

	this.x = 20; 
	this.y = 264;

	this.brzina = 0.2;
	this.gravitacija = 0.4;
	this.skok = 8.5;
	this.preskoci = 30;

	this.uKoaliziji = false;

	this.crtaj = function(){
		if(this.uKoaliziji) ctx.globalAlpha = 0.5;
		ctx.drawImage(rLicmus, this.x, this.y); 

		if(ctx.globalAlpha==0.5) ctx.globalAlpha = 1;
		//this.crtajKoaliziju();
	};
	this.crtajKoaliziju = function(){
		ctx.beginPath();
		ctx.rect(this.x+34,this.y+13,54,50);
		ctx.stroke();
	}

	this.update = function(space, koalizija){
		if(space) { this.brzina = -this.skok; z_playSkok(); }

		this.uKoaliziji = koalizija;
		this.brzina += this.gravitacija;
		this.y += this.brzina;
		if(this.y<=0) { this.brzina = 0.1; this.y = 0; } // kada se nalazi na vrh ekrana
		if(this.y>=canvas.height-rLicmus.height)  this.y = canvas.height-rLicmus.height; // kada se nalazi na dno ekrana
	};

	this.getY = function(){
		return this.y;
	}
}