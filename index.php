<?php
    require 'skripte/facebook/facebook.php';
    require 'skripte/init.php';

    $app_id = '293172064164578';
    $app_secret = 'd52d7ef4a1d7ef2bb4309fd31e582156';
    $app_namespace = 'flappy_licmus';
    $app_url = 'https://apps.facebook.com/' . $app_namespace . '/';
    $scope = 'email,publish_actions';

    // Init the Facebook SDK
    $facebook = new Facebook(array(
         'appId'  => $app_id,
         'secret' => $app_secret,
	));

	// Get the current user
	$user = $facebook->getUser();

	// If the user has not installed the app, redirect them to the Login Dialog
	if (!$user) {
	    $loginUrl = $facebook->getLoginUrl(array(
	    'scope' => $scope,
	    'redirect_uri' => $app_url,
	    ));

	    print('<script> top.location.href=\'' . $loginUrl . '\'</script>');
	}

	$profil = json_decode(file_get_contents('http://graph.facebook.com/'.$user));

	//$db = pg_connect("host=ec2-54-235-117-198.compute-1.amazonaws.com port=5432 dbname=d3j99thhpsr7o0 user=gatawudgykqkel password=10UCSTSvFS12r1DDFMiOjZ_0nv sslmode=require options='--client_encoding=UTF8'") or die('Could not connect: ' . pg_last_error());
	//$acp = pg_query($db, "SELECT bodovi FROM igrac WHERE id=1;");
	//$aco = pg_fetch_array($acp);
	//echo $aco['bodovi'];


	if($user==0) die("GRESKA SA REGISTRACIJOM");
	//if($user!="100002990403277" && $user!="100003570879217") die("We will be back soon!");
	init_startIgrac($user);
?>
<html>
<head>
	<title>Flappy Licmus</title>
	<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>
	<link rel="stylesheet" type="text/css" href="css/index.css">
	<link rel="stylesheet" type="text/css" href="css/canvas.css">
	<link rel="stylesheet" type="text/css" href="css/najbolji_rezultati.css">
	<link rel="stylesheet" type="text/css" href="css/jezik.css">

	<!-- JAVA SCRIPT -->
	<script>
	    var appId = '<?php echo $facebook->getAppID() ?>';
	    var facebookUseId = '<?php echo $user; ?>';
	    var facebookPredhodniRezultat = <?php echo $init_bodovi; ?>;
	    var facebookPredhodnaPozicija = <?php echo $init_pozicija; ?>
	</script>

	<script type="text/javascript" src="js/_jQuery.js"></script>
	<script type="text/javascript" src="js/resursi.js"></script>
	<script type="text/javascript" src="js/zvukovi.js"></script>
	<script type="text/javascript" src="js/Prenta.js"></script>
	<script type="text/javascript" src="js/Cijev.js"></script>
	<script type="text/javascript" src="js/Sunce.js"></script>
	<script type="text/javascript" src="js/Planina.js"></script>
	<script type="text/javascript" src="js/Oblak.js"></script>
	<script type="text/javascript" src="js/Licmus.js"></script>
	<script type="text/javascript" src="js/main.js"></script>
	<script type="text/javascript" src="js/site/site_main.js"></script>
	<script type="text/javascript" src="js/site/najbolji_rezultati.js"></script>
	<script type="text/javascript" src="js/site/jezik.js"></script>
	<script type="text/javascript" src="js/site/JeziciSkup.js"></script>
</head>
<body>

	<div id="fb-root"></div>
	<script src="https://connect.facebook.net/en_US/all.js"></script>
	<script>(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=293172064164578";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

		// Initialize the JS SDK
	    FB.init({
	        appId: appId,
	        cookie: true,
	    });

	    FB.getLoginStatus(function(response) {
	        uid = response.authResponse.userID ? response.authResponse.userID : null;
	    });
	</script>

	<!-- JEZIK -->
	<div id="jezik_cont">
		<div id="jezik_cont2">
			<div class="jezik_btn" jezik="srp" proces="ne">
				<div class="jezik_btn_naslov">Srpski</div>
				<div class="jezik_btn_opis">Изаберите српски као основни језик</div>
			</div>

			<div class="jezik_btn" jezik="eng" proces="ne">
				<div class="jezik_btn_naslov">English</div>
				<div class="jezik_btn_opis">Chose english as your main language (beta).</div>
			</div>
		</div>
	</div>

	<!-- aco228 logo -->
	<div id="left_box">
		<div id="aco228_logo"></div>
		<div class="left_box_solo_naslov"><?php echo $profil->first_name; ?></div>

		<div class="left_box_naslov" id="jNajboljiRezultat">Најбољи резултат</div>
		<div class="left_box_info" id="left_info_bodovi"><?php echo $init_bodovi; ?></div>

		<div class="left_box_naslov" id="jPozicija">Позиција</div>
		<div class="left_box_info" id="left_info_pozicija"><?php echo $init_pozicija; ?></div>
		
		<div class="left_box_solo_naslov" id="jPomoc">Помоћ</div>
		<div class="left_box_info" id="left_info_pomoc">
			Користи <b>space</b> да би скакао.</br>Игрица је оптимизована <b>Google Chrome</b> за тако да је могуће да на другим броузерима ради спорије!
		</div>

		<div class="left_box_solo_naslov" id="jJezik">Језик</div>
		<div class="left_box_info">
			<div class="jezikBtn" id="srp">Српски</div>
			<div class="jezikBtn" id="eng">English</div>
		</div>
	</div>



	<div id="content">
		<!-- Sekspir banner -->
		<div id="sekpir_banner"></div>

		<!-- CANVAS -->
		<div id="canvas_holder">
			<div id="canvas_loading">
				<div id="canvas_loading_procenti">0/9</div>
				<div id="canvas_loading_line"></div>
			</div>

			<div id="canvas_bodovi">
				<div id="prentine_glave">
					<img src="resursi/Prenta_mali.png" alt="" class="prenta_mali" id="prenta1"/>
					<img src="resursi/Prenta_mali.png" alt="" class="prenta_mali" id="prenta2" />
				</div>
				<div id="bodovi">0</div>			
			</div>

			<div id="zvuk_kontrole">
				<img src="resursi/zvuk_da.png" id="btn_zvuk" alt=""/>
			</div>

			<div id="canvas_obavjestenje">
				<div id="canvas_tekst">Лићмус у улози супер лићмуса</br>у борби против цијеви, и тако то</div>
				<div class="canvas_dugme">Започни</div>
			</div>		
			
			<canvas id="canvas" width="581" height="600">Canvas nije podrzan</canvas>
		</div>

		<!-- Ime igraca -->
		<div id="igrac_info">
			<div id="igrac_slika"></div>
			<div id="igrac_ime"><?php echo $profil->name; ?></div>
		</div>

		<div id="najbolji_rezultati">
			<div class="naslov_kolone" id="najbolji_rezulati_naslov">Најбољи резултати</div>

			<div id="najbolji_rezultati_holder">
				<div id="najbolji_rezultati_holder_loading"></div>
				<div id="najbolji_rezultati_holder_stranica"></div>
				<div id="najbolji_rezultati_holder_prikaz"></div>
			</div>

			<div id="najbolji_rezultati_btns_holder">
				<div class="najbolji_rezultati_btns" id="najbolji_rezultati_minus"><<<<<<<<<<</div>
				<div class="najbolji_rezultati_btns" id="najbolji_rezultati_plus">>>>>>>>>>></div>
			</div>
		</div>

		<div id="najbolji_rezultati">
			<div class="naslov_kolone" id="poslednji_registrovani_naslov">Последљи регистровани</div>
			<div style="margin-top:10px">
				<?php init_poslednjiRegistrovani(); ?>
			</div>
		</div>

		<div id="facebook_komponente">
			<div class="fb-comments" data-href="https://apps.facebook.com/flappy_licmus/" data-numposts="5" data-colorscheme="light"></div>
		</div>

		<div id="footer">
			Шекспир продукција 2014
		</div>

	</div>

	<script type="text/javascript">
		jezik_init(<?php echo "'" . $init_jezik . "'";?>);
	</script>
</body>
</html>