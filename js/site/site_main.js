$(document).ready(function(){
	site_podesiContent();
	site_postaviSliku();
});

var user_id = facebookUseId;
var PREDHODNI_REZULTAT = facebookPredhodniRezultat;
var PREDHODNA_POZICIJA = facebookPredhodnaPozicija;

function site_podesiContent(){
	var left = ($(window).width() / 2) - ( $('#content').width() / 2);
	$('#content').css('left', left + 'px');
}

function site_postaviSliku(){
	var url = 'https://graph.facebook.com/' + user_id + '/picture?width=54&height=54';
	$('#igrac_slika').css('background-image', 'url('+url+')');
}

function site_canvas_komunikator(){
	var osnovniString = jPresaoSiSamo + REZULTAT + jPrepreka;
	if(REZULTAT > PREDHODNI_REZULTAT) site_posaljiBodove(osnovniString);
	else $('#canvas_tekst').html(osnovniString + "Ништа то не ваља!");
}

var jPresaoSiSamo = "Прешао си само "; var jPrepreka = " препрека.</br>";
var jSihronizacija = "Сихронизација са базом...</b>Сачекајте...";
var jPopravioSiPoziciju = "Поправио си позицију за "; var jMjesta = " мјеста!";
var jTrenutnoSiPrvi = "Тренутно си први! Свака част!";
var jTop5 = "Ушао си у топ 5! Браво!";
var jTop10 = "Ушао си у почетних 10! Мада није то нешто";
var jPopravioPredhodniRezultat = "Поправио си предходни најбољи резултат";

function site_posaljiBodove(osnovniString){
	// vraca novu poziciju
	$('#canvas_tekst').html(jSihronizacija);
	$.ajax({
		type: "POST",
		url: "skripte/rezultati.php",
		data: "&akcija=setRezultati&rez="+REZULTAT+"&fid="+user_id,
		success: function(o){ 
			
			// BODOVI POSLATI
			var pozicija = parseInt(o);
			PREDHODNI_REZULTAT = REZULTAT;
			$('#left_info_bodovi').text(REZULTAT);
			$('#left_info_pozicija').text(pozicija);

			var rezultat_string = "</br>"; var br_mjesta = PREDHODNA_POZICIJA - pozicija;
			if(br_mjesta!=0) { rezultat_string = rezultat_string + jPopravioSiPoziciju + br_mjesta+ jMjesta; }
			PREDHODNA_POZICIJA = pozicija;
			
			var tekst_poruka = "";
			if(pozicija==1){ tekst_poruka = osnovniString + jTrenutnoSiPrvi + rezultat_string; }
			else if(pozicija>=2 && pozicija <= 5) { tekst_poruka = osnovniString + jTop5 + rezultat_string; }
			else if(pozicija <= 10) { tekst_poruka = osnovniString + jTop10 + rezultat_string; }
			else { tekst_poruka = osnovniString + jPopravioPredhodniRezultat + rezultat_string; }

			$('#canvas_tekst').html(tekst_poruka);
			site_facebookFeed();
		}	
	});
}

var site_facebookFeed_VEC_POSLATO = false;

function site_facebookFeed() {
	if(site_facebookFeed_VEC_POSLATO) return;
	site_facebookFeed_VEC_POSLATO = true;

 	var mymessage = "је управо прескочио "+REZULTAT+" препрека са Супер флапи Лићмусом пресветим!";
 	var mypic = "https://fbcdn-sphotos-g-a.akamaihd.net/hphotos-ak-frc1/t1/1800263_1474803386076355_1799556552_n.jpg";
 	var mylink = "https://goo.gl/5tiiMn";
 	var myname = "Супер флапи Лићмус";
 	var mydesc = "Лићмус у епизоди Супер флапи Лићмуса у борби против зелених препрека и слично!";
    FB.api('/me/feed', 'post', { 
    	message: mymessage, 
    	picture: mypic, 
    	link: mylink, 
    	name: myname, 
    	description: mydesc 
    },function (response){ 
    	console.dir(response);
    });
 };