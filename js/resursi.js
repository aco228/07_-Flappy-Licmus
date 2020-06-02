var ukupnoResursa = 11;
var brojResursa = 0;

var rSplash = new Image();
var rCijev = new Image();
var rLicmus = new Image();
var rPrenta = new Image();
var rOblak1 = new Image();
var rOblak2 = new Image();
var rOblak3 = new Image();
var rOblak4 = new Image();
var rSunce = new Image();
var rPrelaz = new Image();
var rPlanina = new Image();

function resursi_init(){

	rSplash.setAttribute('onload', 'resursi_ucitano()');
	rSplash.src = "resursi/Splash.png";

	rCijev.setAttribute('onload', 'resursi_ucitano()');
	rCijev.src = "resursi/Cijev.png";

	rLicmus.setAttribute('onload', 'resursi_ucitano()');
	rLicmus.src = "resursi/Licmus.png";

	rPrenta.setAttribute('onload', 'resursi_ucitano()');
	rPrenta.src = "resursi/Prenta.png";

	rOblak1.setAttribute('onload', 'resursi_ucitano()');
	rOblak1.src = "resursi/oblak1.png";

	rOblak2.setAttribute('onload', 'resursi_ucitano()');
	rOblak2.src = "resursi/oblak2.png";

	rOblak3.setAttribute('onload', 'resursi_ucitano()');
	rOblak3.src = "resursi/oblak3.png";

	rOblak4.setAttribute('onload', 'resursi_ucitano()');
	rOblak4.src = "resursi/oblak4.png";


	rSunce.setAttribute('onload', "resursi_ucitano()");
	rSunce.src = "resursi/Sunce.png";

	rPrelaz.setAttribute('onload', "resursi_ucitano()");
	rPrelaz.src = "resursi/Prelaz.png";

	rPlanina.setAttribute('onload', "resursi_ucitano()");
	rPlanina.src = "resursi/Planina.png";
}


function resursi_ucitano(){
	brojResursa++;
	if(ukupnoResursa==brojResursa) { $('#canvas_loading').fadeOut(500); $('canvas_loading').html(''); game_init(); return; }

	var procenat = brojResursa / ukupnoResursa * 100;
	$('#canvas_loading_line').css('width', procenat+'%');
	$('#canvas_loading_procenti').text(brojResursa + ' / ' + ukupnoResursa);

	var pW = $('#canvas_loading_procenti').width();
	var lW = $('#canvas_loading_line').width();
	var pozicija = 0;

	if(lW-pW>0) pozicija = lW - pW;
	$('#canvas_loading_procenti').css('left', pozicija+'px');
}
