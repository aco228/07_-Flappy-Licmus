$(document).ready(function(){
	main_setCanvas();
	main_input();
	$('#canvas_bodovi').hide();
	$('#canvas_obavjestenje').hide();
});

var canvas, ctx, ctx3;

function main_setCanvas(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	ctx3 = document.getElementById('canvas3').getContext('2d');
	resursi_init();
}

function main_input(){
	$(document).keypress(function(e) {
	    if(e.which == 13) {
	        if(unutar_splash){ start_igrice(); unutar_splash = false; } 
	    } else if(e.which == 32){
	    	licmus_space = true; 
	        e.preventDefault(); 
	    }
	});
	$('#canvas').click(function(e){ licmus_space = true; e.preventDefault(); });
	$('.canvas_dugme').click(function(){ if(unutar_splash){ start_igrice(); unutar_splash=false; }});
}


/*
	IGRICA VARIJABLE
*/
var unutar_splash = false;
var lista_cijevi; var cijevi_x; var cijevi_x_brzina = 1.2; 
var lista_oblaka; 
var sunce;
var lista_planina;
var licmus; var licmus_space = false; 
var interval = NaN;
var REZULTAT = 0; var PRENTE = 0; // prente su zivoti

// Prikaz pocetnog stanja ili smrti
function splash_screen(prikazi_kraj){
	unutar_splash = true;
	$('#canvas_bodovi').hide();
	if(interval!=NaN) clearInterval(interval);
	if(prikazi_kraj){
		ctx.fillStyle = 'rgba(192,20,20,0.5)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(rSplash, 3, 60);
		$('#canvas_obavjestenje').show();
	} else {
		$('#canvas_obavjestenje').show();
		ctx.drawImage(rSplash, 3, 60);
	}
}

// Inicijalizacija igrice
function start_igrice(){
	delete licmus; licmus = new Licmus(rLicmus, ctx); licmus_space = false;
	cijevi_x = canvas.width;

	// Inicijalizacija lista
	cijevi_x_brzina = 1.2;
	delete lista_cijevi; lista_cijevi = [];  lista_cijevi.push(new Cijev(rCijev, ctx, cijevi_x, cijevi_x_brzina)); lista_cijevi[0].prvi();
	delete lista_oblaka; lista_oblaka = [];  lista_oblaka.push(new Oblak(ctx));    lista_oblaka[0].prvi();
	delete lista_planina;lista_planina = []; lista_planina.push(new Planina(ctx)); lista_planina[0].prvi();
	delete sunce; sunce = new Sunce(ctx3);

	REZULTAT = 0; $('#bodovi').text(REZULTAT); $('#canvas_bodovi').show();
	$('.prenta_mali').hide(); PRENTE = 0;
	$('#canvas_obavjestenje').hide();
	z_playBack();
	delta_prije = Date.now(); interval = setInterval(game_loop, 1);
}

var delta_prije; 
function game_loop(){
	if(unutar_splash) return;
	var sad = Date.now();
	var delta = (sad - delta_prije) / 5;

	provjera_cijevi();
	provjera_oblaci();
	provjera_planine();
	update(delta);
	crtaj();

	delta_prije = sad;
}

// Povecavanje brzine varijable
var predhodniBrojBodova = 0;
function provjera_cijevi(){
	// PROMJENA BRZINE UKOLIKO SE REZULTAT POVECAO ZA 5
	if(REZULTAT==0) predhodniBrojBodova = 0;
	if(REZULTAT-predhodniBrojBodova==5) { predhodniBrojBodova = REZULTAT; cijevi_x_brzina += 0.2; }
	// BRISANJE CIJEVI KOJI SU VAN EKRANA

	var index = 0;
	for(var i = lista_cijevi.length-1; i >= 0; i--){
		if(lista_cijevi[i].getBrisanje()) lista_cijevi.splice(i, 1);
	}  

	// PROVJERA DA LI JE MOGUCE KREIRATI NOVU CIJEV UKOLIKO JE RAZMAK ISPOSTOVAN
	cijevi_x -= cijevi_x_brzina;
	if(cijevi_x < canvas.width - 350){
		cijevi_x = canvas.width;
		lista_cijevi.push(new Cijev(rCijev, ctx, cijevi_x, cijevi_x_brzina));
	}
}
function provjera_oblaci(){
	// Brisanje neakttivnih oblaka
	for(var i = lista_oblaka.length-1; i >= 0; i--){
		if(lista_oblaka[i].getBrisanje()) lista_oblaka.splice(i, 1);
	} 

	// Dodavanje novih oblaka ukoliko je slucajni broj 5 i nema vise od 15 oblaka trenutno
	var broj = Math.floor(Math.random()*(500-0+1)+0);
	if(broj==5 && lista_oblaka.length <= 15) lista_oblaka.push(new Oblak(ctx)); 
}
function provjera_planine(){
	// Brisanje neaktivnih planina
	for(var i = lista_planina.length-1; i >= 0; i--){
		if(lista_planina[i].getBrisanje()) lista_planina.splice(i, 1);
	} 
	$('#broj').text("planine: "+lista_planina.length);

	// Dodavanje novih oblaka ukoliko je slucajni broj 5 i nema vise od 15 oblaka trenutno
	var broj = Math.floor(Math.random()*(500-0+1)+0);
	if(broj==5 && lista_planina.length <= 3) lista_planina.push(new Planina(ctx)); 
}

var uKoaliziji = false; 
function update(delta){
	var licmusY = licmus.getY(); uKoaliziji = false; 
	for(var i = 0; i < lista_cijevi.length; i++){
		var koalizija = lista_cijevi[i].update(licmusY, delta);
		if(koalizija=='da'){
			if(PRENTE>0){
				uKoaliziji = true; // Argument koji se salje licmusu da bi smanjio koaliziju
				if(PRENTE==1) $('#prenta1').hide(); else $('#prenta2').hide();
				PRENTE--;
			} else splash_screen(true);
		} else if(koalizija=='vec_se_nalazi') uKoaliziji = true; // ukoliko je koalizija vec detektovana
	}
	for(var j = 0; j < lista_oblaka.length; j++) lista_oblaka[j].update(delta);
	for(var k = 0; k < lista_planina.length; k++) lista_planina[k].update(delta);
	licmus.update(licmus_space, delta, uKoaliziji); licmus_space = false;
	sunce.update(delta);
}

function crtaj(){
	if(unutar_splash) return;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx3.clearRect(0, 0, canvas.width, canvas.height);

	//for(var k = 0; k < lista_planina.length; k++) lista_planina[k].crtaj();
	//for(var j = 0; j < lista_oblaka.length; j++) lista_oblaka[j].crtaj();
	for(var i = 0; i < lista_cijevi.length; i++) lista_cijevi[i].crtaj();
	licmus.crtaj();
	sunce.crtaj();

	if(uKoaliziji){
		// ukoliko se licmus nalazi u koaliziji
		ctx.fillStyle = 'rgba(192,20,20,0.2)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
	//ctx.drawImage(rPrelaz, 0, 0);
}
