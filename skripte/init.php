<?php
	require('baza.php');

	$init_bodovi = 0;
	$init_pozicija = 0;
	$init_jezik = "";

	function init_startIgrac($fid){
		global $init_bodovi;
		global $init_pozicija;
		global $init_jezik;

		// Provjera da li igrac postoji u bazi
		$br = baza_q("SELECT COUNT(*) AS br FROM igrac WHERE fid='".$fid."';");

		if($br['br']==0) igrac_noviIgrac($fid); 	// registruje novog igraca
		else $init_bodovi = igrac_getBodovi($fid); // preuzima bodove ako igrac postoji

		$init_pozicija = igrac_getPozicija($fid);
		$init_jezik = igrac_getJezik($fid);
	}

	function init_poslednjiRegistrovani(){
		$rezultat = baza_qMul("SELECT fid, bodovi FROM igrac ORDER BY datum DESC LIMIT 5;");
		while($igrac = pg_fetch_array($rezultat)){
			$fb_ime = json_decode(file_get_contents("http://graph.facebook.com/".$igrac['fid']));
			$fb_slika = "http://graph.facebook.com/".$igrac['fid']."/picture?type=small";

			$klasa = "";
			$pozicija = "";
			//$slika = "https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-ash4/t1/1623780_701940349850401_445965910_n.jpg";
			$slika = $fb_slika;
			$ime = $fb_ime->name;
			$bodovi = $igrac['bodovi'];
			$ifid = $igrac['fid'];

			// odredjivanje klase
			if($igrac['pozicija']==1) $klasa = "rez_gold";
			else if($igrac['pozicija'] >=2 && $igrac['pozicija'] <= 5) $klasa = "rez_silver";
			else if($fid==$igrac['fid']) $klasa = "rez_me";

			//stampa
			echo "<a href=\"https://www.facebook.com/profile.php?id=".$ifid."\" target=\"_BLANK\">
				  <div class=\"rez_igrac ".$klasa."\" fid=\"".$ifid."\" prijatelj=\"ne\">
					<div class=\"rez_klasa rez_br\">".$pozicija."</div>
					<div class=\"rez_klasa rez_slika\" style=\"background-image: url('".$slika."')\"></div>
					<div class=\"rez_klasa rez_ime\"><b>".$ime."</b></div>
					<div class=\"rez_klasa rez_bodovi\">".$bodovi."</div>
				</div></a>";

		}
	}

?>