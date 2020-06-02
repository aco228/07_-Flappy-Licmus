$(document).ready(function(){
	z_promjenaZvuka();
});

var OMOGUCEN_ZVUK = true;

function z_promjenaZvuka(){
	$('#btn_zvuk').click(function(){
		if(OMOGUCEN_ZVUK){
			OMOGUCEN_ZVUK = false;
			$('#btn_zvuk').attr('src', 'resursi/zvuk_ne.png');
			zBack.pause();
		} else {
			OMOGUCEN_ZVUK = true;
			$('#btn_zvuk').attr('src', 'resursi/zvuk_da.png');
			zBack.play();
		}
	});
}

var zPrenta = new Audio('resursi/zvukovi/Prenta.mp3');
var zSkok = new Audio('resursi/zvukovi/Skok.mp3');
var zUdarac = new Audio('resursi/zvukovi/Udarac.mp3');
var zBack = new Audio('resursi/zvukovi/Back1.mp3');

function zUcitan(unos){
	switch(unos){
		case 'Prenta': zPrenta_ucitan = true; break;
		case 'Skok': zSkok_ucitan = true; break;
		case 'Udarac': zUdarac_ucitan = true; break;
	}
}


function z_playBack(){
	if(!OMOGUCEN_ZVUK) return;
	var zvuk = Math.floor(Math.random()*(3-1+1)+1);
	switch(zvuk){
		case 1: zBack.src = "resursi/zvukovi/Back1.mp3"; zBack.play(); break;
		case 2: zBack.src = "resursi/zvukovi/Back2.mp3"; zBack.play(); break;
		case 3: zBack.src = "resursi/zvukovi/Back3.mp3"; zBack.play(); break;
	}
}

function z_playSkok(){
	if(!OMOGUCEN_ZVUK) return;
	zSkok.src = "resursi/zvukovi/Skok.mp3";
	zSkok.play();
}

function z_playPrenta(){
	if(!OMOGUCEN_ZVUK) return;
	zPrenta.src = "resursi/zvukovi/Prenta.mp3";
	zPrenta.play();
}

function z_playUdarac(){
	if(!OMOGUCEN_ZVUK) return;
	zUdarac.src = "resursi/zvukovi/Udarac.mp3";
	zUdarac.play();
}
