function jezik_initSrpski(){	
	document.title = 'Super Flappy Licmus';

	//left box
	$('#jNajboljiRezultat').html("Најбољи резултат");
	$('#jPozicija').html("Позиција");
	$('#jPomoc').html("Помоћ");
		$('#left_info_pomoc').html("Користи <b>space</b> да би скакао.</br>Игрица је оптимизована <b>Google Chrome</b> за тако да је могуће да на другим броузерима ради спорије!");
	$('#jJezik').html("Језик");

	//Canvas
	$('#canvas_obavjestenje > #canvas_tekst').html("Лићмус у улози супер лићмуса</br>у борби против цијеви, и тако то");
	$('#canvas_obavjestenje > .canvas_dugme').html("Започни");

	//ingame
	jPresaoSiSamo = "Прешао си само "; jPrepreka = " препрека.</br>";
	jSihronizacija = "Сихронизација са базом...</b>Сачекајте...";
	jPopravioSiPoziciju = "Поправио си позицију за "; jMjesta = " мјеста!";
	jTrenutnoSiPrvi = "Тренутно си први! Свака част!";
	jTop5 = "Ушао си у топ 5! Браво!";
	jTop10 = "Ушао си у почетних 10! Мада није то нешто";
	jPopravioPredhodniRezultat = "Поправио си предходни најбољи резултат";

	//kolone
	$('#najbolji_rezulati_naslov').html('Најбољи резултати');
	$('#poslednji_registrovani_naslov').html("Последљи регистровани");

	//footer
	$('#footer').html("Шекспир продукција 2014");

}

function jezik_initEngleski(){
	document.title = 'Super Flappy Licmus';

	//left box
	$('#jNajboljiRezultat').html("Top score");
	$('#jPozicija').html("Position");
	$('#jPomoc').html("Help");
		$('#left_info_pomoc').html("Use <b>space</b> to jump. Use <b>enter</b> to start. </br>Game is optimized for <b>Google Chrome</b> so there is possibility that in other browsers running slower!");
	$('#jJezik').html("Language");

	//Canvas
	$('#canvas_obavjestenje > #canvas_tekst').html("Licmus in the role of super Licmus </ br> in the fight against the pipes, and so on");
	$('#canvas_obavjestenje > .canvas_dugme').html("Start");

	//ingame
	jPresaoSiSamo = "You flew only "; jPrepreka = " obstacles.</br>";
	jSihronizacija = "Synchronization with a database...</b>Hold on...";
	jPopravioSiPoziciju = "You fixed your position for "; jMjesta = " places!";
	jTrenutnoSiPrvi = "You are now first! Congratulations!";
	jTop5 = "You walked in top 5! Bravo!";
	jTop10 = "You walked in the initial 10! Don't get too excited about that";
	jPopravioPredhodniRezultat = "You fixed your last top score!";

	//kolone
	$('#najbolji_rezulati_naslov').html('Best scorer list');
	$('#poslednji_registrovani_naslov').html("The last registered");

	//footer
	$('#footer').html("Shakespeare production 2014");
}