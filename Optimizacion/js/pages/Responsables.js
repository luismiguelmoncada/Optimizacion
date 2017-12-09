var idtipoidaux = "CC";
$(document).ready(function () {


    $("#ddlCups").select2({
        placeholder: "Selecciona el CUPS"
    });
    $("#ddlEmpleado").select2({
        placeholder: "Selecciona el Responsable"
    });
    var cboEmpleado = $('#ddlEmpleado');
    llenarCombos(cboEmpleado, "spOrdenamientos_ObtenerUsuarios");
    var cboCups = $('#ddlCups');
    llenarCombos(cboCups, "spOrdenamientos_Obtener_ListaCUPS");

    $('#btnListResponsables').on("click", function (e) {
        consultarAsignaciones("spGestionOrdenamiento_ListarResponsables");
    });

    $("#btnAdd").on("click", function (e) {
        AsignarResponsables();
    });

   

    //$('#tablaParametros').DataTable({
    //    "scrollY": "200px",
    //    "scrollCollapse": true,
    //    "paging": false
    //});
});

//Asignacion de responsables
function consultarAsignaciones(spP) {

    $.ajax({
        url: "Responsables.aspx/cargarDatos",
        data: "{ sp: '" + spP + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        type: 'POST'
    }).done(function (rest) {
        if (rest.Error != undefined) {
            swal(swalheadertxt, 'No tiene permisos para ingresar', 'warning');
        } else {

            var listaDatos = JSON.parse(rest.d);
            var datos = listaDatos.Table;

            $('#tablaParametros td').remove();
            $("#bodytablaParametros").empty();

            if (listaDatos.Table.length > 0) {

                for (var i = 0; i < datos.length; i++) {

                    var tbl = '';
                    tbl += '<tr id="tr_' + datos[i].IdAsignacion + '">';
                    tbl += '<td>' + datos[i].NombreCompleto + '</td>';
                    tbl += '<td>' + datos[i].identificacion + '</td>';
                    tbl += '<td>' + datos[i].cups + '</td>';
                    tbl += '<td>' + datos[i].Descripcion + '</td>';
                    tbl += '<td>' + '<input type="button" id="btnEliminar_' + datos[i].IdAsignacion + '" onclick="EliminarResponsable(' + datos[i].IdAsignacion + ')" class="btn btn-primary" value="Eliminar" />' + '</td>';
                    //tbl += '<td>' + '<button id="btnEliminar_' + datos[i].IdAsignacion + '" onclick="EliminarResponsable(' + datos[i].IdAsignacion + ')" class="btn btn-primary">Eliminar</button>' + '</td>';
                    tbl += '</tr>';

                    $("#tablaParametros").append(tbl);
                }
            }
            else {
                //swal('Evolution Ordenamientos', 'No se encontraron ordenes asignadas al usuario: ' + tipoidoptimizador +': ' + idoptimizador + '.', 'warning');                   
            }
        }

    });

}

function FiltrarResponsables() {

    var input, filter, table, tr, td, i;
    input = document.getElementById("txtfiltroRespon");
    filter = input.value.toUpperCase();
    table = document.getElementById("tablaParametros");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }

}

function FiltrarTablaProveedor1(txtinput, nombretabla, posiciontabla) {

    var input, filter, table, tr, td, i;
    input = document.getElementById(txtinput);
    filter = input.value.toUpperCase();
    table = document.getElementById(nombretabla);
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[posiciontabla];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }

}

function AsignarResponsables() {

    var idresponsable = $('#ddlEmpleado').val();
    var responsable = $("#ddlEmpleado :selected").text();
    var cups = $('#ddlCups').val();
    var descripcion = $("#ddlCups :selected").text();

    var usuariosis = sessionStorage.getItem("UsuarioSistema");
    //var rowCount = $('#tablaParametros tr').length;       

    //console.log(idresponsable)
    //console.log(cups)
    //console.log($('#selecttest').val())

    if (idresponsable.length == 0 || cups == "null" || idresponsable == 0) {
        swal(swalheadertxt, 'Lo sentimos, debes seleccionar un responsable de la lista.', 'warning');
    } else if (cups.length = 0 || cups == "null" || cups == 0) {
        swal(swalheadertxt, 'Lo sentimos, debes seleccionar un cups de la lista.', 'warning');
    } else {

        $.ajax({
            url: "Responsables.aspx/guardarAsignacionResponsable",
            data: "{ IdTipoId: '" + idtipoidaux + "', Identificacion: '" + idresponsable + "', Cups: '" + cups + "', descripcion: '" + descripcion + "', usuariosis: '" + usuariosis + "'}",
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

                if (listaDatos.Table.length > 0) {

                    if (datos[0].Respuesta == "OK") {

                        var tbl = '';
                        tbl += '<tr id="tr_' + datos[0].idasignacion + '">';
                        tbl += '<td>' + responsable + '</td>';
                        tbl += '<td>' + idresponsable + '</td>';
                        tbl += '<td>' + cups + '</td>';
                        tbl += '<td>' + descripcion + '</td>';
                        tbl += '<td>' + '<input type="button" id="btnEliminar_a' + datos[0].idasignacion + '" onclick="EliminarResponsable(' + datos[0].idasignacion + ')" class="btn btn-primary" value="Eliminar" />' + '</td>';
                        tbl += '</tr>';

                        $("#tablaParametros").append(tbl);

                        swal(swalheadertxt, 'Bien, la asignación se realizó correctamente.', 'success');

                    } else {
                        swal(swalheadertxt, 'Lo sentimos, el CUPS ' + cups + ' ya fue asignado a ' + responsable + '.', 'warning');
                    }
                }
                else {
                    swal(swalheadertxt, 'Lo sentimos, el registro no se actualizo.', 'warning');
                }
            }
        });
    }
}

function EliminarResponsable(idasignacion) {

    swal({
        title: swalheadertxt,
        text: "¿Estas segur@ que la Asignación debe ser eliminada?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: false
    }, function () {
        $.ajax({
            url: "Responsables.aspx/eliminarAsignacionResponsable",
            data: "{ idasignacion: '" + idasignacion + "'}",
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

                if (listaDatos.Table.length > 0) {

                    if (datos[0].Respuesta == "OK") {
                        //borra la fila de la tabla en pantalla
                        //$('#tr_' + idasignacion).html('');
                        $('#tr_' + idasignacion).remove();
                        //tr[posicion].style.display = "none";
                        swal(swalheadertxt, 'Bien, la asignación se eliminó correctamente.', 'success');
                    } else {
                        swal(swalheadertxt, 'Lo sentimos, la asignación no se eliminó correctamente.', 'error');
                    }
                }
                else {
                    swal(swalheadertxt, 'Lo sentimos, el registro no se eliminó.', 'error');
                }
            }
        });
    });
}

function llenarCombos(combo, spP) {

    $.ajax({
        url: "Responsables.aspx/cargarDatos",
        data: "{ sp: '" + spP + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        type: 'POST'
    }).done(function (rest) {
        if (rest.Error != undefined) {
            swal(swalheadertxt, 'No tiene permisos para ingresar', 'warning');
        } else {
            //Obtenemos la lista
            var lista = JSON.parse(rest.d);

            // $.each(lista, function (index, value) {
            //Incrustamos las opciones del SelectList
            for (var i = 0; i < lista.Table.length; i++) {

                $(combo).append('<option value="' + lista.Table[i].Nit + '">' + lista.Table[i].RazonSocial + '</option>');


                if (combo.selector == "#ddlCupsout") {
                    listacupsout = lista;
                }

            }
            // });
        }

    });
}