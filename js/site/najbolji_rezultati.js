$(document).ready(function(){
	$('#najbolji_rezultati_holder_loading').hide();
	$('#najbolji_rezultati_holder_stranica').hide();
	$('#najbolji_rezultati_minus').hide(); // posto se nalazi na prvoj stranici pri inicijalizaciji

	rez_ucitaj('desno');
	rez_btns();
});

var rez_stranica = 0;

function rez_ucitaj(direkcija){
	$('#najbolji_rezultati_holder_loading').fadeIn(100);
	$('.najbolji_rezultati_btns').addClass('btn_rez_zauzet');
	$.ajax({
		type: "POST",
		url: "skripte/rezultati.php",
		data: "&akcija=getRezultati&str="+rez_stranica+"&fid="+user_id,
		success: function(o){ 
			var velicina = $('#najbolji_rezultati_holder').width();
			if(direkcija=='desno'){
				$('#najbolji_rezultati_holder_stranica').css('left', velicina + 'px');
				$('#najbolji_rezultati_holder_stranica').html(o);
				$('#najbolji_rezultati_holder_stranica').show();

				$('#najbolji_rezultati_holder_prikaz').animate({left:'-'+velicina+'px'}, 500);
				$('#najbolji_rezultati_holder_stranica').animate({left:'0px'}, 500, function(){
					$('#najbolji_rezultati_holder_prikaz').attr('id', 'tranzicija');
					$('#najbolji_rezultati_holder_stranica').attr('id', 'najbolji_rezultati_holder_prikaz');
					$('#tranzicija').attr('id', 'najbolji_rezultati_holder_stranica');
					$('#najbolji_rezultati_holder_stranica').hide();
					$('#najbolji_rezultati_holder_stranica').html('');
					$('#najbolji_rezultati_holder_loading').fadeOut(200);

					$('.najbolji_rezultati_btns').removeClass('btn_rez_zauzet');
				});
			} else if(direkcija=='lijevo'){
				$('#najbolji_rezultati_holder_stranica').css('left', '-'+velicina + 'px');
				$('#najbolji_rezultati_holder_stranica').html(o);
				$('#najbolji_rezultati_holder_stranica').show();

				$('#najbolji_rezultati_holder_prikaz').animate({left:velicina+'px'}, 500);
				$('#najbolji_rezultati_holder_stranica').animate({left:'0px'}, 500, function(){
					$('#najbolji_rezultati_holder_prikaz').attr('id', 'tranzicija');
					$('#najbolji_rezultati_holder_stranica').attr('id', 'najbolji_rezultati_holder_prikaz');
					$('#tranzicija').attr('id', 'najbolji_rezultati_holder_stranica');
					$('#najbolji_rezultati_holder_stranica').hide();
					$('#najbolji_rezultati_holder_stranica').html('');
					$('#najbolji_rezultati_holder_loading').fadeOut(200);

					$('.najbolji_rezultati_btns').removeClass('btn_rez_zauzet');
				});
			}

			rez_initPosleDodavanja();
		}
	});
}
function rez_initPosleDodavanja(){
	// Provjera da li se nalazi na prvoj stranici ( da ne prikazuje minus )
	if(rez_stranica==0) $('#najbolji_rezultati_minus').hide();
	else{
		if(!$('#najbolji_rezultati_minus').is(":visible")) $('#najbolji_rezultati_minus').show();
	}

	if(rez_imaJosRezultata_komunikator){
		if(!$('#najbolji_rezultati_plus').is(":visible")) $('#najbolji_rezultati_plus').show();
	} else $('#najbolji_rezultati_plus').hide();
}

function rez_btns(){
	$('#najbolji_rezultati_minus').click(function(){ 
		if(!$('#najbolji_rezultati_minus').hasClass('btn_rez_zauzet')){ rez_stranica--; rez_ucitaj('lijevo'); } 
	});
	$('#najbolji_rezultati_plus').click(function(){  
		if(!$('#najbolji_rezultati_plus').hasClass('btn_rez_zauzet')) { rez_stranica++; rez_ucitaj('desno'); }  
	});
}
