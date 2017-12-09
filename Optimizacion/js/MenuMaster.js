$(document).ready(function () {

    var Logueado = sessionStorage.getItem('Logueado');
    if (Logueado == null) {
        window.location = 'Login.aspx';
    }

    $("#btnSalir").on("click", function (e) {
        sessionStorage.clear();
        localStorage.clear();
        window.location = 'Login.aspx';
        //location.reload();
    });    
    
    var nombreusuario = sessionStorage.getItem("nombreUsuario");
    var rolusuario = sessionStorage.getItem("rolUsuario");

    $("#nombreusuario_1").html(nombreusuario); 
    $("#nombreusuario_2").html(rolusuario);

    crearMenu();

});


function crearMenu() {
    
    var lista = JSON.parse(sessionStorage.getItem("menuobject"));
    var listamenus = lista.Table;
    
    var menu = '';
    menu += ' <li class="header">MENÚ PRINCIPAL</li>';   

    for (var i = 0; i < listamenus.length; i++) {       

        if (listamenus[i].Url != 'NOURL') { 
            menu += '<li><a href="' + listamenus[i].Url + '"><i class="' + listamenus[i].Icono + '"></i><span>' + listamenus[i].NombreMenu + '</span></a></li>';
        }
       
    }
        
    $("#menucontent").html(menu);
}



