
$(document).ready(function () {

    var cboProveedor = $('#ddlPProveedor');
    var cboProveedoresXCups = $('#ddlProveedoresXCups');

    cboProveedor.select2({
        placeholder: "Selecciona el Proveedor"
    });

    cboProveedoresXCups.select2({
        placeholder: "Selecciona el CUPS"
    });

    llenarCombos(cboProveedor, "spsuministros_Proveedores_ObtenerNew");
    llenarCombos(cboProveedoresXCups, "spOrdenamientos_Obtener_ListaCUPS");

    $("#btnAddPx").on("click", function (e) {
        AsignarProveedoresCups();
    });

    $('#btnListProveCups').on("click", function (e) {
        consultarAsignacionesProveedoresCups("spGestionOrdenamiento_ListarProveedoresXCups");
    });

    //Promedan


    var cboProveedorProm = $('#ddlPProveedorProm');
    var cboProveedoresXCupsProm = $('#ddlProveedoresXCupsProm');

    cboProveedorProm.select2({
        placeholder: "Selecciona la Clasificación"
    });

    cboProveedoresXCupsProm.select2({
        placeholder: "Selecciona el CUPS"
    });

    llenarCombos(cboProveedorProm, "spGestionOrdenamientos_ProveedoresObtenerPromedan");
    llenarCombos(cboProveedoresXCupsProm, "spOrdenamientos_Obtener_ListaCUPS");

    $("#btnAddPromeCups").on("click", function (e) {
        AsignarProveedoresCupsProme();
    });

    $('#btnListaCupsProme').on("click", function (e) {
        consultarAsignacionesPromedanCups("spGestionOrdenamiento_ListarProveedoresXCupsPromedan");
    });
});

//Asignacion de proveedores por cups
function consultarAsignacionesProveedoresCups(spP) {

    $.ajax({
        url: "Proveedores.aspx/cargarDatos",
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

            $('#tablaProveedoresXCups td').remove();
            $("#bodytablaProveedoresXCups").empty();

            if (listaDatos.Table.length > 0) {

                for (var i = 0; i < datos.length; i++) {

                    var tbl = '';
                    tbl += '<tr id="trProveCups_' + datos[i].IdAsignacion + '">';
                    tbl += '<td>' + datos[i].RazonSocial + '</td>';
                    tbl += '<td>' + datos[i].Proveedor + '</td>';
                    tbl += '<td>' + datos[i].Cups + '</td>';
                    tbl += '<td>' + datos[i].Descripcion + '</td>';
                    tbl += '<td>' + '<input type="button" id="btnEliminarProveGen_' + datos[i].IdAsignacion + '" onclick="EliminarProveedorCups(' + datos[i].IdAsignacion + ')" class="btn btn-danger" value="Eliminar" />' + '</td>';

                    //tbl += '<td>' + '<button id="btnEliminar_' + datos[i].IdAsignacion + '" onclick="EliminarProveedorCups(' + datos[i].IdAsignacion + ')" class="btn btn-danger">Eliminar</button>' + '</td>';
                    tbl += '</tr>';

                    $("#tablaProveedoresXCups").append(tbl);
                }
            }
            else {
                //swal('Evolution Ordenamientos', 'No se encontraron ordenes asignadas al usuario: ' + tipoidoptimizador +': ' + idoptimizador + '.', 'warning');                   
            }
        }

    });

}

function AsignarProveedoresCups() {

    var Pproveedor = $('#ddlPProveedor').val();
    var responsable = $("#ddlPProveedor :selected").text();
    var cups = $('#ddlProveedoresXCups').val();
    var descripcion = $("#ddlProveedoresXCups :selected").text();

    var usuariosis = sessionStorage.getItem("UsuarioSistema");

    //var rowCount = $('#tablaParametros tr').length;       

    //console.log(Pproveedor)
    //console.log(cups)
    //console.log(descripcion)

    if (Pproveedor.length == 0 || cups == "null" || Pproveedor == 0) {
        swal(swalheadertxt, 'Lo sentimos, debes seleccionar un proveedor de la lista.', 'warning');
    } else if (cups.length = 0 || cups == "null" || cups == 0) {
        swal(swalheadertxt, 'Lo sentimos, debes seleccionar un cups de la lista.', 'warning');
    } else {

        $.ajax({
            url: "Proveedores.aspx/guardarAsignacionProveedoresCups",
            data: "{ Pproveedor: '" + Pproveedor + "', cups: '" + cups + "', descripcion: '" + descripcion + "', usuariosis: '" + usuariosis + "'}",
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
                        tbl += '<tr id="trProveCups_' + datos[0].idasignacion + '">';
                        tbl += '<td>' + responsable + '</td>';
                        tbl += '<td>' + Pproveedor + '</td>';
                        tbl += '<td>' + cups + '</td>';
                        tbl += '<td>' + descripcion + '</td>';
                        tbl += '<td>' + '<input type="button" id="btnEliminar_aProveedorGen' + datos[0].IdAsignacion + '" onclick="EliminarProveedorCups(' + datos[0].IdAsignacion + ')" class="btn btn-danger" value="Eliminar" />' + '</td>';

                        //tbl += '<td>' + '<button id="btnEliminar_aProveedorGen' + datos[0].idasignacion + '" onclick="EliminarProveedorCups(' + datos[0].idasignacion + ')" class="btn btn-primary">Eliminar</button>' + '</td>';
                        tbl += '</tr>';

                        $("#tablaProveedoresXCups").append(tbl);

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

function EliminarProveedorCups(idasignacion) {

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
            url: "Proveedores.aspx/eliminarAsignacionProveedoresCups",
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
                        $('#trProveCups_' + idasignacion).remove();
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



function consultarAsignacionesPromedanCups(spP) {

    $.ajax({
        url: "Proveedores.aspx/cargarDatos",
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

            $('#tablaProveedoresXCupsPromedan td').remove();
            $("#bodytablaProveedoresXCupsPromedan").empty();

            if (listaDatos.Table.length > 0) {

                for (var i = 0; i < datos.length; i++) {

                    var tbl = '';
                    tbl += '<tr id="trProveCupsProme_' + datos[i].IdAsignacion + '">';
                    tbl += '<td>' + datos[i].NombreCompleto + '</td>';
                    tbl += '<td>' + datos[i].Cups + '</td>';
                    tbl += '<td>' + datos[i].Descripcionnew + '</td>';
                    tbl += '<td>' + '<input type="button" id="btnEliminarProProme_' + datos[i].IdAsignacion + '" onclick="EliminarProveedorCupsProme(' + datos[i].IdAsignacion + ')" class="btn btn-danger" value="Eliminar" />' + '</td>';

                    //tbl += '<td>' + '<button id="btnEliminarProme_' + datos[i].IdAsignacion + '" onclick="EliminarProveedorCupsProme(' + datos[i].IdAsignacion + ')" class="btn btn-primary">Eliminar</button>' + '</td>';
                    tbl += '</tr>';

                    $("#tablaProveedoresXCupsPromedan").append(tbl);
                }
            }
            else {
                //swal('Evolution Ordenamientos', 'No se encontraron ordenes asignadas al usuario: ' + tipoidoptimizador +': ' + idoptimizador + '.', 'warning');                   
            }
        }

    });

}

function AsignarProveedoresCupsProme() {

    var ProveedorProme = $('#ddlPProveedorProm').val();
    var responsable = $("#ddlPProveedorProm :selected").text();
    var cupsProme = $('#ddlProveedoresXCupsProm').val();
    var descripcion = $("#ddlProveedoresXCupsProm :selected").text();

    var usuariosis = sessionStorage.getItem("UsuarioSistema");

    if (ProveedorProme.length == 0 || ProveedorProme == 0) {
        swal(swalheadertxt, 'Lo sentimos, debes seleccionar un proveedor de la lista.', 'warning');
    } else if (cupsProme.length = 0 || cupsProme == "null" || cupsProme == 0) {
        swal(swalheadertxt, 'Lo sentimos, debes seleccionar un cups de la lista.', 'warning');
    } else {

        //console.log(ProveedorProme)
        //console.log(cupsProme)

        $.ajax({
            url: "Proveedores.aspx/guardarAsignacionProveedoresCupsProme",
            data: "{ ProveedorProme: '" + ProveedorProme + "', cupsProme: '" + cupsProme + "', usuariosis: '" + usuariosis + "'}",
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
                        tbl += '<tr id="trProveCupsProme_' + datos[0].idasignacion + '">';
                        tbl += '<td>' + responsable + '</td>';
                        tbl += '<td>' + cupsProme + '</td>';
                        tbl += '<td>' + descripcion + '</td>';
                        tbl += '<td>' + '<input type="button" id="btnEliminarPromeProbv_' + datos[0].IdAsignacion + '" onclick="EliminarProveedorCupsProme(' + datos[0].IdAsignacion + ')" class="btn btn-danger" value="Eliminar" />' + '</td>';

                        //tbl += '<td>' + '<button id="btnEliminarProme_' + datos[0].idasignacion + '" onclick="EliminarProveedorCupsProme(' + datos[0].idasignacion + ')" class="btn btn-primary">Eliminar</button>' + '</td>';
                        tbl += '</tr>';

                        $("#tablaProveedoresXCupsPromedan").append(tbl);

                        swal(swalheadertxt, 'Bien, la asignación se realizó correctamente.', 'success');

                    } else {
                        swal(swalheadertxt, 'Lo sentimos, el CUPS ' + cupsProme + ' ya fue asignado a ' + responsable + '.', 'warning');
                    }
                }
                else {
                    swal(swalheadertxt, 'Lo sentimos, el registro no se actualizo.', 'warning');
                }
            }
        });
    }
}

function EliminarProveedorCupsProme(idasignacion) {

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
            url: "Proveedores.aspx/eliminarAsignacionProveedoresCupsProme",
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
                        $('#trProveCupsProme_' + idasignacion).remove();
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
        url: "Proveedores.aspx/cargarDatos",
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

