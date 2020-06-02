function jezik_init(injezik){
	$('#jezik_cont').hide();
	jezik_btns_init(); // dugmad sa index-a

	if(injezik=='') {
		$('#jezik_cont').fadeIn(300);
		$("body").css({overflow: 'hidden'});
		jezik_cont_init();
	} else jezik_promjeni(injezik);

}

var JEZIK = "";

function jezik_cont_init(){
	// centriranje objekta
	var l = ($(window).width() / 2) - ( $('#jezik_cont2').width() / 2);
	var t = ($(window).height() / 2) - ( $('#jezik_cont2').height() / 2);
	$('#jezik_cont2').css('left', l + 'px'); $('#jezik_cont2').css('top', t + 'px');

	// klik na jezik
	$('.jezik_btn').click(function(){
		if( $(this).attr('proces')=='da') return;
		var injezik = $(this).attr('jezik');
		$(this).attr('proces', 'da');
		$('#jezik_cont2').fadeOut(500);

		jezik_update_jezik(injezik);

	});
}

function jezik_update_jezik(injezik){
	$.ajax({
		type: "POST",
		url: "skripte/rezultati.php",
		data: "&akcija=setJezik&jezik="+injezik+"&fid="+user_id,
		success: function(o){ 

			jezik_promjeni(injezik);

			$('#jezik_cont').fadeOut(300, function(){
				$('#jezik_cont').html("");
				$("body").css({overflow: 'visible'});
			});
		}	
	});
}

function jezik_promjeni(injezik){
	JEZIK=injezik;
	$('#'+JEZIK).addClass('jezikBtnIzabran');
	jezik_btn_enable = true;

	switch(JEZIK){
		case 'srp': jezik_initSrpski(); break;
		case 'eng': jezik_initEngleski(); break;
		default:  console.error("jezik_promjeni: nema"); break;
	}
}

var jezik_btn_enable = false;
function jezik_btns_init(){
	$('.jezikBtn').click(function(){
		if(!jezik_btn_enable) return;
		if($(this).hasClass('jezikBtnIzabran')) return;

		$('.jezikBtnIzabran').removeClass('jezikBtnIzabran');
		jezik_update_jezik($(this).attr('id'));
		jezik_btn_enable = false;
	});
}
