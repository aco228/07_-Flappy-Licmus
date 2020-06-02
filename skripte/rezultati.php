<?php
	if(!isset($_POST['akcija'])) die("greska");
	require('baza.php');

	switch($_POST['akcija']){
		case "getRezultati": getRezultati($_POST['str'], $_POST['fid']); break;
		case "setRezultati": setRezultat($_POST['rez'], $_POST['fid']); break;
		case "setJezik" : setJezik($_POST['jezik'], $_POST['fid']); break;
	}

	function setRezultat($rez, $fid){
		//echo "rez: " . $rez . " fid: " . $fid; 
		igrac_setBodovi($rez, $fid);
		echo igrac_getPozicija($fid);
	}

	function setJezik($jezik, $fid){
		igrac_setJezik($jezik, $fid);
		echo $jezik;
	}

	function getRezultati($str, $fid){
		$start = $str * 10;

		// Da li se nalazimo na kraju rezultata
		$kraj_rezultata = 'true';
		$ukupno = baza_q("SELECT COUNT(*) AS br FROM igrac;");
		if($start+10 >= $ukupno['br']) $kraj_rezultata = 'false';

		echo "<script type=\"text/javascript\">
				var rez_imaJosRezultata_komunikator = ".$kraj_rezultata.";
			</script>";

		$rezultat = baza_qMul("SELECT row_number() OVER(ORDER BY bodovi DESC) AS pozicija, fid, bodovi FROM igrac ORDER BY bodovi DESC LIMIT 10 OFFSET ".$start.";");
		while($igrac = pg_fetch_array($rezultat)){
			$fb_ime = json_decode(file_get_contents("http://graph.facebook.com/".$igrac['fid']));
			$fb_slika = "http://graph.facebook.com/".$igrac['fid']."/picture?type=small";

			$klasa = "";
			$pozicija = $igrac['pozicija'];
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

<?php /*

<script type="text/javascript">
	var rez_imaJosRezultata_komunikator = true;
</script>

<div class="rez_igrac rez_me">
	<div class="rez_klasa rez_br">1</div>
	<div class="rez_klasa rez_slika"></div>
	<div class="rez_klasa rez_ime"><b>Aleksandar Konatar</b></div>
	<div class="rez_klasa rez_bodovi">288</div>
</div>

<div class="rez_igrac rez_gold">
	<div class="rez_klasa rez_br">1</div>
	<div class="rez_klasa rez_slika"></div>
	<div class="rez_klasa rez_ime"><b>Aleksandar Konatar</b></div>
	<div class="rez_klasa rez_bodovi">288</div>
</div>

<div class="rez_igrac rez_silver">
	<div class="rez_klasa rez_br">1</div>
	<div class="rez_klasa rez_slika"></div>
	<div class="rez_klasa rez_ime"><b>Aleksandar Konatar</b></div>
	<div class="rez_klasa rez_bodovi">288</div>
</div>

<div class="rez_igrac">
	<div class="rez_klasa rez_br">1</div>
	<div class="rez_klasa rez_slika"></div>
	<div class="rez_klasa rez_ime"><b>Aleksandar Konatar</b></div>
	<div class="rez_klasa rez_bodovi">288</div>
</div>

*/
?>