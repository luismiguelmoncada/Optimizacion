var archivos = [];
var nombrearchivo;
var swalheadertxt = "Optimización";

$(document).ready(function () {

    $("#btnRepartir").on("click", function (e) {
        $("#loaderepartir").show();
        RepartirOrdenes();
    });

});


function subirArchivos() {
    Dropzone.autoDiscover = false;

    $("#mydropzone").dropzone({
        url: "ImportarArchivo.ashx",
        addRemoveLinks: true,
        success: function (file, response) {
            var imgName = response;
            archivos.push(imgName);
            sessionStorage.setItem('archivos', archivos);
        },
        error: function (file, response) {

            alert("Error cargando el archivo");
        }
    });

}

 function procesarArchivo() {
             
        if (archivos.length == 0 || nombrearchivo == archivos || archivos.toString().indexOf("error") != -1) {
            swal(swalheadertxt, 'Lo sentimos, no se encontraron archivos o el archivo ya fue procesado anteriormente.', 'warning');
        } else {

            $.ajax({
                url: "SubirArchivo.aspx/procesarArchivo",
                data: "{ Archivo: '" + archivos + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                type: 'POST'
            }).done(function (rest) {

                //console.log(rest)
                //console.log(rest.d)

                if (rest.d == "KO") {
                    //alert(rest.Error);
                    swal(swalheadertxt, 'Lo sentimos, no se encontraron archivos con el formato adecuado.', 'warning');
                } else {
                    nombrearchivo = archivos;
                    swal(swalheadertxt, 'Bien, proceso realizado con exito.', 'success');
                }

                //if (rest.Error != undefined) {
                //    alert(rest.Error);
                //    swal('GestionOrdenamiento', 'lo sentimos, ocurrio un error..', 'warning');
                //} else {
                //    swal('GestionOrdenamiento', 'Proceso realizado con exito..', 'success');
                //}
            });
        }       
 }

 function RepartirOrdenes() {

     var IdtipoOpt = sessionStorage.getItem("tipoidusuariosis");
     var IdOpt = sessionStorage.getItem("idusuariosis");

     //console.log(IdtipoOpt)
     //console.log(IdOpt)

     $.ajax({
         url: "SubirArchivo.aspx/actualizarDistribuir_Ordenes",
         data: "{ IdtipoOpt: '" + IdtipoOpt + "', IdOpt: '" + IdOpt + "'}",
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         async: true,
         type: 'POST'
     }).done(function (rest) {
         if (rest.Error != undefined) {
             alert(rest.Error);
         } else {
             var listaDatos = JSON.parse(rest.d);
             var datos = listaDatos.Table;

             //$('#tablaRepartir td').remove();
             $('#tablaRepartir tbody').html('');


             if (listaDatos.Table.length > 0) {

                 for (var i = 0; i < datos.length; i++) {

                     var tbl = '';
                     tbl += '<tr>';
                     tbl += '<td>' + datos[i].IdTipoId + '</td>';
                     tbl += '<td>' + datos[i].Identificacion + '</td>';
                     tbl += '<td>' + datos[i].NombreCompleto + '</td>';
                     tbl += '<td>' + datos[i].Cups + '</td>';
                     tbl += '<td>' + datos[i].TotalAsignado + '</td>';
                     tbl += '<td>' + datos[i].TotalOrdenes + '</td>';
                     tbl += '</tr>';

                     $("#tablaRepartir").append(tbl);

                     $("#loaderepartir").hide();
                 }
             }
             else {
                 swal(swalheadertxt, 'Lo sentimos, no se encontraron datos, todas las ordenes ya fueron asignadas.', 'info');
                 $("#loaderepartir").hide();
             }
         }
     });
 }

 function ExportToExcelRepartir() {
     var htmltable = document.getElementById('tablaRepartir');
     var html = htmltable.outerHTML;
     window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
 }
