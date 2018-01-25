jQuery("document").ready(function($){
	var nav = $('.menufixed');
	var header = $( ".main-header" );
	var offset = header.offset();
	altura = offset.top + header.height() - 40 ;
	$(window).scroll(function () {
		if ($(this).scrollTop() > altura) {
			nav.fadeIn();
		} else {
			nav.hide();
		}
	});
	if($(window).width()<992)
		$('.barramenu').addClass('navbar-fixed-top');

	$('#boton-buscador').click(function() {
	  $('.buscador-header').fadeToggle();
	  $(this).parent().toggleClass('activo');
	  $('#buscar-textfield').focus();
	});
	$('#boton-buscador-resp').click(function() {
	  $('.buscador-header').fadeToggle();
	  $(this).parent().toggleClass('activo');
	  $('#buscar-textfield').focus();
	});
	$('#cerrar-buscador').click(function() {
	  $('.buscador-header').fadeToggle();
	});
	$('#boton-buscador-peq').click(function() {
	  $('.search-peq').fadeToggle();
	});
	$('#boton-buscador-peq-resp').click(function() {
	  $('.search-peq').fadeToggle();
	});
	$('#cerrar-buscador-peq').click(function() {
	  $('.search-peq').fadeToggle();
	});

	//Bloque cuéntenos lo que sabe
	$('.information a').click(function(e) {
		e.preventDefault();
	  $('.cuentenos').fadeToggle();
	});


	//Revisar si el div de la galería está dentro del html actual
	if ( $('#lasillavacia-galeria').length != 0 ){
		if ( $('#hidden-galery').length != 0 ){
			$('#lasillavacia-galeria').html($('#hidden-galery').html());
		}
	}

	// Función para pestañas
	$('.article-filters .filter-buttons a').click(function(e) {
	  e.preventDefault();
	  var _this = $(this);
	  $( ".article-filters .filter-buttons a" ).each(function( index ) {
	  	if($(this).text()==$(_this).text()){
  			$(_this).parent().find('a').removeClass('active');
	  		$(_this).addClass('active');
	  		$('.filtered-results').hide();
	  		$('#pestana-'+index).fadeToggle();
	  	}
	  });
	});

	// Enumeración para las más vistas
	$( ".vistas .enum" ).each(function( index ) {
	  	$(this).find('span').html(index+1);
	  });

	//funciones para el buscador del quien es quien
	$('a.buscarqq').click(function(e) {
	  e.preventDefault();
	  $('.layerbusqueda').fadeToggle('fast');
	  $('#buscabasico').focus();
	});
	$('.layerbusqueda a.cerrar').click(function(e) {
	  e.preventDefault();
	  $('.layerbusqueda').fadeToggle('fast');
	});
	if ( $('#buscabasico').length != 0 ){
		$('#buscabasico').autocomplete({
			serviceUrl: '/quien/personas/BuscarPerfilNombreDrupal',
			maxHeight: 580,
			onSelect: function (suggestion) {
				$('#frame-qq').attr('src','http://lasillavacia.com/sites/default/files/redesqq/index.html?personajes='+suggestion.data);
				$('.layerbusqueda').fadeToggle('fast');
				$('#buscabasico').val('');
			}
		});
	}

	//funciOn para desplegar tarjetas de perfil
	$('.article-full a').mouseenter(function(e) {
		var href = $(this).attr('href');
		_this = this;
		alto = $(_this).scrollTop();
		if(href.indexOf('quienesquien/perfilquien/') > -1){
			$('.tarjeta-qq').remove();
			$.ajax({
				method: "POST",
				url: "/quien/tarjeta",
				data: { alias: href }
			})
			.done(function( url ) {
				$.ajax({
					method: "GET",
					url: url,
				})
				.done(function( data ) {
					alto = $(_this).offset();
					data.link = href;
					tarjeta = darTarjeta(data);
					$('body').append(tarjeta);
					$('.tarjeta-qq').css('top',alto.top-10);
					$('.tarjeta-qq').css('left',alto.left);
				}).fail(function(e) {

				});
			});
		}
	});

	$('body').delegate( ".tarjeta-qq a.cerrar", "click",function(e) {
		e.preventDefault();
		$(this).parent().remove();
	});


	$('.qqsuper-link').click(function(e) {
		e.preventDefault();
		personajes = $(this).attr('personajes');
		quien_es_quien__data.switch('/limit/'+personajes);
		$('.menu-super').html($(this).html());
	});

	$('.login-link').click(function(e) {
		e.preventDefault();
		eloffset = $(this).offset();
		$('.login-block').offset({left: eloffset.left-120 });
		$('.login-block').fadeToggle();
	});

	$("div input.send_newsletter").click(function(ev){
		ev.preventDefault();
		var imageUrl = '/sites/all/themes/lasillavacia/images/iconos/loading.gif';
		$('input.send_newsletter').css('background-image', 'url(' + imageUrl + ')');
		email = $("div input#email_newsletter").val();
		//alert(email);
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  		if(regex.test(email)){
  			//$('div input.send_newsletter').text('loading...');

  			$.ajax({
			  method: "GET",
			  url: "lsv_suscribir_news/" + email,
			  dataType: "html",
			  success: function(ret) {
			  	if(ret == 1){
			  		var imageUrl = '/sites/all/themes/lasillavacia/images/iconos/iconos_mail.svg';
					$('input.send_newsletter').css('background-image', 'url(' + imageUrl + ')');
			  		alert("Se ha enviado un correo a su dirección para que confirme su suscripción.");

			  	} else {
			  		var imageUrl = '/sites/all/themes/lasillavacia/images/iconos/iconos_mail.svg';
					$('input.send_newsletter').css('background-image', 'url(' + imageUrl + ')');
			  		alert("Ha ocurrido un error en la suscripción.");
			  	}
           	  }
			});
  		} else {
  			var imageUrl = '/sites/all/themes/lasillavacia/images/iconos/iconos_mail.svg';
			$('input.send_newsletter').css('background-image', 'url(' + imageUrl + ')');
  			alert("Debe escribir una dirección de correo electrónico válida.");
  		}
	});
});


function darTarjeta(data){
	cerrar = jQuery('<a>').attr('href','#').addClass('cerrar').html('X');
	img = jQuery('<img>').attr('src',data.foto).attr('alt',data.nombre);
	link = jQuery('<a>').attr('href',data.link).append(img);
	nombre = jQuery('<a>').attr('href',data.link).append(jQuery('<h2>').html(data.nombre));
	cargo = jQuery('<h3>').html(data.ocupacion);
	conexion = jQuery('<span>').html('TOTAL DE CONEXIONES ' + data.conexiones);
	tarjeta = jQuery('<div>').addClass('tarjeta-qq').append(cerrar).append(link).append(nombre).append(cargo).append(conexion).append('<div class="cleafix"></div>');
	return tarjeta;
}

	function iqClickCount(precio, url, nodeId, e){
		e.preventDefault();
		var tipo = "Descarga";
		if ( precio > 0 ){
			tipo = "Compra";
		}
		jQuery.post("/lsv/click-count", { nid: nodeId }, function(data){
			console.log(data);
		})
  	.always(function() {
    	window.open(url, '_blank');
  	});

	}
//array para guardar cache de tarjetas
//var tarjetas = array();
;
   // request permission on page load
document.addEventListener('DOMContentLoaded', function () {
  if (!Notification) {
    alert('Las notificaciones de escritorio no están soportadas en su navegador, por favor pruebe en un navegador moderno.'); 
    return;
  }
  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

var client = new WebSocket('wss://lasillavacia.com:2087/', 'echo-protocol');
     
    client.onerror = function() {
        console.log('Connection Error');
    };
     
    client.onopen = function() {
        console.log('WebSocket Client Connected');
    };
     
    client.onclose = function() {
        console.log('echo-protocol Client Closed');
    };
     
    client.onmessage = function(e) {
        if (typeof e.data === 'string') {
            console.log("Received: '" + e.data + "'");
            notifyMe(e.data);
        }
    };

function notifyMe(body) {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    mensaje = JSON.parse(body);
    var notification = new Notification('La Silla Vacía', {
      icon: '/sites/all/themes/lasillavacia/images/logo/logo_silla_simbolo.png',
      body: mensaje.titulo,
    });

    notification.onclick = function () {
      window.open(mensaje.url);      
    };
  }

};
