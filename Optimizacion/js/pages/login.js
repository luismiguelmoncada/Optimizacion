//------------- login.js -------------//
var swalheadertxt = "Optimización";
$(document).ready(function() {

	//validate login form 
	$("#login-form").validate({
		ignore: null,
		ignore: 'input[type="hidden"]',
		errorPlacement: function( error, element ) {
			var place = element.closest('.input-group');
			if (!place.get(0)) {
				place = element;
			}
			if (place.get(0).type === 'checkbox') {
				place = element.parent();
			}
			if (error.text() !== '') {
				place.after(error);
			}
		},
		errorClass: 'help-block',
		rules: {
			email: {
				required: true
				//email: true
			},
			password: {
				required: true,
				minlength: 5
			}
		},
		messages: {
			password: {
			    required: "Por favor, ingresa tu clave",
			    minlength: "Tu clave debe contener minimo 5 caracteres"
			},
			email: "Por favor, ingresa tu usuario",
		},
		highlight: function( label ) {
			$(label).closest('.form-group').removeClass('has-success').addClass('has-error');
		},
		success: function( label ) {
			$(label).closest('.form-group').removeClass('has-error');
			label.remove();
		}
	});

});

function iniciarSesion() {

    var usuario = $('#email').val();
    var clave = $('#password').val();

    $.ajax({
        url: "Login.aspx/validarUsuario",
        data: "{ UsuarioSistema: '" + usuario + "', Clave: '" + clave + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        type: 'POST'
    }).done(function (rest) {
        if (rest.Error != undefined) {
            alert(rest.Error);
        } else {

            var lista = JSON.parse(rest.d);
            var datos = lista.Table;

            if (lista.Table.length > 0) {

                if (lista.Table[0].respuesta == "OK") {

                    var menuobject = rest.d;
                   
                    sessionStorage.setItem("UsuarioSistema", usuario);
                    sessionStorage.setItem("nombreUsuario", lista.Table[0].NombreCompleto);
                    sessionStorage.setItem("rolUsuario", lista.Table[0].Rol);
                    sessionStorage.setItem("tipoidusuariosis", lista.Table[0].idtipoid);
                    sessionStorage.setItem("idusuariosis", lista.Table[0].identificacion);
                    sessionStorage.setItem("menuobject", menuobject);

                    sessionStorage.setItem('Logueado', "SI");
                    //console.log(datos)
                    window.location = 'Index.aspx';
                 
                } else {
                    swal({
                        title: swalheadertxt,
                        text: "Lo sentimos, no tienes permisos para ingresar.",
                        type: "error",
                        confirmButtonText: "ACEPTAR"
                    });
                }
            }
            else {
                swal({
                    title: swalheadertxt,
                    text: "Lo sentimos, no tienes permisos para ingresar.",
                    type: "error",
                    confirmButtonText: "ACEPTAR"
                });
            }
        }
    });
}