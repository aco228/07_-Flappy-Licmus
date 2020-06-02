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

	$profil = $facebook->api('/me','GET');

	//$db = pg_connect("host=ec2-54-235-117-198.compute-1.amazonaws.com port=5432 dbname=d3j99thhpsr7o0 user=gatawudgykqkel password=10UCSTSvFS12r1DDFMiOjZ_0nv sslmode=require options='--client_encoding=UTF8'") or die('Could not connect: ' . pg_last_error());
	//$acp = pg_query($db, "SELECT bodovi FROM igrac WHERE id=1;");
	//$aco = pg_fetch_array($acp);
	//echo $aco['bodovi'];


	init_startIgrac($user);
?>

<html>
<head>
	<title>Flappy Licmus</title>
	<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>
	<link rel="stylesheet" type="text/css" href="css/index.css">
	<link rel="stylesheet" type="text/css" href="css/canvas.css">

	<!-- JAVA SCRIPT -->
	<script src="https://connect.facebook.net/en_US/all.js"></script>
	<script>
	    var appId = '<?php echo $facebook->getAppID() ?>';
	    var facebookUseId = '<?php echo $user; ?>';
	    var facebookTokenn;

	    // Initialize the JS SDK
	    FB.init({
	        appId: appId,
	        cookie: true,
	    });

	    FB.getLoginStatus(function(response) {
	        uid = response.authResponse.userID ? response.authResponse.userID : null;
	        facebookTokenn = response.authResponse.accessToken;
	    });

	</script>

	<script type="text/javascript" src="js/_jQuery.js"></script>
	<script type="text/javascript" src="js/resursi.js"></script>
	<script type="text/javascript" src="js/howler_sound.js"></script>
	<script type="text/javascript" src="js/zvukovi.js"></script>
	<script type="text/javascript" src="js/Prenta.js"></script>
	<script type="text/javascript" src="js/Cijev.js"></script>
	<script type="text/javascript" src="js/Sunce.js"></script>
	<script type="text/javascript" src="js/Planina.js"></script>
	<script type="text/javascript" src="js/Oblak.js"></script>
	<script type="text/javascript" src="js/Licmus.js"></script>
	<script type="text/javascript" src="js/main.js"></script>
	<script type="text/javascript" src="js/site/site_main.js"></script>
</head>
<body>

	<!-- aco228 logo -->
	<div id="aco228_logo"></div>


	<div id="content">
		<!-- Sekspir banner -->
		<div id="sekpir_banner"></div>

		<!-- CANVAS -->
		<div id="canvas_holder">
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
			<div id="igrac_ime"><?php echo $profil['name']; ?></div>

			<div id="rezultat_holder">
				<div id="najbolji_rezultat">Најбољи резултат</div>
				<div id="rezultat_igraca"><?php echo $init_bodovi; ?></div>
			</div>
		</div>

	</div>
</body>
</html>