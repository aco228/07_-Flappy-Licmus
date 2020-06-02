<?php

	$baza_connect = "host=ec2-54-235-117-198.compute-1.amazonaws.com port=5432 dbname=d3j99thhpsr7o0 user=gatawudgykqkel password=10UCSTSvFS12r1DDFMiOjZ_0nv sslmode=require options='--client_encoding=UTF8'";

	function baza_e($query){
		global $baza_connect;
		$conn = pg_connect($baza_connect) or die('DBconn: ' . pg_last_error());
		pg_query($conn, $query) or die("DBe " . pg_last_error($conn));
		pg_close($conn);
	}
	function baza_q($query){
		global $baza_connect;
		$conn = pg_connect($baza_connect) or die('DBconn: ' . pg_last_error());
		$rezultat = pg_query($conn, $query) or die("DBqMul " . pg_last_error($conn));
		$back = pg_fetch_array($rezultat);
		pg_close($conn);
		return $back;
	}

	function baza_qMul($query){
		global $baza_connect;
		$conn = pg_connect($baza_connect) or die('DBconn: ' . pg_last_error());
		$back = pg_query($conn, $query) or die("DBqMul " . pg_last_error($conn));
		pg_close($conn);
		return $back;
	}

	function igrac_noviIgrac($fid){
		baza_e("INSERT INTO igrac (fid) VALUES ( '".$fid."' ); ");
	}
	function igrac_getPozicija($fid){
		$rezultat = baza_q("SELECT A.pozicija AS pozicija FROM (
								SELECT row_number() OVER(ORDER BY bodovi DESC) AS pozicija, fid FROM igrac ORDER BY bodovi DESC 
							) AS A WHERE A.fid='".$fid."';");
		return $rezultat['pozicija'];
	}
	function igrac_getJezik($fid){
		$rezultat = baza_q("SELECT jezik FROM igrac WHERE fid='".$fid."';");
		return $rezultat['jezik'];		
	}
	function igrac_setJezik($jezik, $fid){
		baza_e("UPDATE igrac SET jezik='".$jezik."' WHERE fid='".$fid."';");
	}
	function igrac_getBodovi($fid){
		$rezultat = baza_q("SELECT bodovi FROM igrac WHERE fid='".$fid."';");
		return $rezultat['bodovi'];		
	}
	function igrac_setBodovi($bodovi, $fid){
		baza_e("UPDATE igrac SET bodovi=".$bodovi." WHERE fid='".$fid."';");
	}

?>