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
	resursi_init();
}

function main_input(){
	$(document).keypress(function(e) {
	    if(e.which == 13) {
	        if(unutar_splash){ start_igrice();  } 
	    } else if(e.which == 32){
	    	if(!gl_stop) licmus_space = true; 
	    	e.preventDefault(); 
	    }
	});
	$('#canvas').click(function(e){ licmus_space = true;  });
	$('.canvas_dugme').click(function(){ if(unutar_splash){ start_igrice(); unutar_splash=false; }});
}


/*
	IGRICA VARIJABLE
*/
var unutar_splash = false;
var lista_cijevi;
var lista_oblaka; 
var sunce;
var lista_planina;
var licmus; var licmus_space = false; 
var REZULTAT = 0; var PRENTE = 0; // prente su zivoti

function game_init(){
	licmus = new Licmus(); 
	lista_cijevi = new CijevLista();
	lista_oblaka = new OblakLista();
	lista_planina = new PlaninaLista();
	sunce = new Sunce();
	splash_screen();
}

// Prikaz pocetnog stanja ili smrti
function splash_screen(prikazi_kraj){
	unutar_splash = true; gl_stop = true;

	$('#canvas_bodovi').hide();
	if(prikazi_kraj){
		ctx.fillStyle = 'rgba(192,20,20,0.5)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(rSplash, 3, 60);
		site_canvas_komunikator(); // PROVJERA ZA REZULTAT!! (site_main.js)
		$('#canvas_obavjestenje').show();
	} else {
		$('#canvas_obavjestenje').show();
		ctx.drawImage(rSplash, 3, 60);
	}
	// Igra zapocinje iz main_input() sa klikom na neko dugme
}

// Inicijalizacija igrice
function start_igrice(){
	unutar_splash = false;
	licmus_space = false;
	lista_cijevi.init(true);
	lista_oblaka.init(true);
	lista_planina.init(true);

	REZULTAT = 0; $('#bodovi').text(REZULTAT); $('#canvas_bodovi').show();
	$('.prenta_mali').hide(); PRENTE = 0;
	$('#canvas_obavjestenje').hide();
	z_playBack();

	gl_stop = false;
	game_loop();
}

 
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var gl_stop = true;
var gl_DELTA = 3.5;

function game_loop(){
	if(!gl_stop) requestAnimFrame( game_loop );

	lista_cijevi.update(licmus.getY());
	lista_oblaka.update();
	lista_planina.update();
	licmus.update(licmus_space, lista_cijevi.getKoalizija()); licmus_space = false;
	sunce.update();

	crtaj();
}

function crtaj(){
	if(unutar_splash) return;
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	lista_planina.crtaj();
	lista_oblaka.crtaj();
	lista_cijevi.crtaj();
	licmus.crtaj();
	sunce.crtaj();

	if(lista_cijevi.getKoalizija()){
		// ukoliko se licmus nalazi u koaliziji
		ctx.fillStyle = 'rgba(192,20,20,0.2)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
}
