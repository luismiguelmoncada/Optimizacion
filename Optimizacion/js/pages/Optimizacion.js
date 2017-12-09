var totalpendientes, datosorden;
var swalheadertxt = "Optimización";

$(document).ready(function () {

    var IdtipoOpt = sessionStorage.getItem("tipoidusuariosis");
    var IdOpt = sessionStorage.getItem("idusuariosis");

    consultarOrdenesFecha(IdtipoOpt, IdOpt);

    $("#btnActualizartabla").on("click", function (e) {
        //remueve el cuerpo de la tabala

        //var tbl = document.getElementById("tablaAsignar"); // Get the table
        //tbl.removeChild(tbl.getElementsByTagName("tbody")[0]);       
        consultarOrdenesFecha(IdtipoOpt, IdOpt);
    });

  
});

function consultarOrdenesFecha(tipoidoptimizador, idoptimizador) {

    //console.log(tipoidoptimizador)
    //console.log(idoptimizador)

    $.ajax({
        url: "Optimizacion.aspx/consultarOrdenesxOptimizador",
        data: "{ tipoidoptimizador: '" + tipoidoptimizador + "', idoptimizador: '" + idoptimizador + "'}",
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
            var datos1 = listaDatos.Table1;
            var datos2 = listaDatos.Table2;
            var datos3 = listaDatos.Table3;

            $('#tablaAsignar td').remove();
            $("#bodytablaAsignar").empty();

            if (listaDatos.Table.length > 0) {

                totalpendientes = datos2[0].cantidadPendientes;
                document.getElementById('lbltotalasignados').innerHTML = datos1[0].cantidadTotal;
                document.getElementById('lbltotalpendientes').innerHTML = datos2[0].cantidadPendientes;
                document.getElementById('lbltotalvencidas').innerHTML = datos3[0].cantidadVencidas;


                for (var i = 0; i < datos.length; i++) {

                    // console.log(datos[i].idConsecutivo)

                    var tbl = '';
                    //tbl += '<tr>';
                    tbl += '<tr id="tr_' + datos[i].idConsecutivo + '">';
                    tbl += '<td>' + datos[i].Codigo_Solicitud_Ciklos + ' - ' + datos[i].idConsecutivo + '</td>';
                    tbl += '<td>' + datos[i].FechaCargueSistema + '</td>';
                    tbl += '<td id="td_dias' + datos[i].idConsecutivo + '">' + datos[i].DiasEspera + '</td>';
                    tbl += '<td id="td_pciente' + datos[i].idConsecutivo + '">' + datos[i].Id_Afiliado + ': ' + datos[i].NombreCompleto + '</td>';
                    tbl += '<td>' + datos[i].IPSUsuario + '</td>';
                    tbl += '<td>' + datos[i].Centro_generador_de_autorizacion + '</td>';
                    tbl += '<td>' + datos[i].DescripcionNew + '</td>';
                    tbl += '<td>' + datos[i].Especialidad + '</td>';
                    tbl += '<td>' + '<input type="button" id="btninfo_' + datos[i].idConsecutivo + '" onclick="MasInformacion(' + i + ')" class="btn btn-primary" value="Ver" />' + '</td>';

                    //tbl += '<td>' + '<button id="btninfo_' + datos[i].idConsecutivo + '" class="btn btn-primary" onclick="MasInformacion(' + i + ')">Ver</button>' + '</td>';
                    tbl += '<td>' + '<input type="button" id="btnAsignarProveedor_' + datos[i].idConsecutivo +
                            '" class="btn btn-warning" onclick="ValidarOrden(' + datos[i].idConsecutivo + ',' + i + ')" value="Optimizar" />' + '</td>';

                    //tbl += '<td>' + '<button id="btnAsignarProveedor_' + datos[i].idConsecutivo +
                    //        '" class="btn btn-primary" onclick="ValidarOrden(' + datos[i].idConsecutivo + ',' + i + ')">Optimizar</button>' + '</td>';
                    tbl += '</tr>';


                    $("#tablaAsignar").append(tbl);

                    //muestra en color rojo la celda del registro para mostrar alerta por demora en la gestion de la orden
                    if (datos[i].DiasEspera > 3) {
                        $('#td_dias' + datos[i].idConsecutivo).css('background-color', '#f9dde2');
                    }

                    if (datos[i].NombreCompleto == "No Registra En EVO") {
                        $('#td_pciente' + datos[i].idConsecutivo).css('background-color', '#F4FA58');
                    }

                }
                datosorden = datos;
            }
            else {
                document.getElementById('headeroptimizacion').innerHTML = "No Tienes ordenes asignadas";
                document.getElementById('optimi').innerHTML = "";
                //swal('Evolution Ordenamientos', 'No se encontraron ordenes asignadas al usuario: ' + tipoidoptimizador +': ' + idoptimizador + '.', 'warning');
                $('#tablaAsignar td').remove();
                $("#bodytablaAsignar").empty();
            }
        }
    });
}

function MasInformacion(posicion) {

    document.getElementById('myModaltittle').innerHTML = 'Detalle de la Orden ' + datosorden[posicion].Codigo_Solicitud_Ciklos;
    document.getElementById('lblfechacicklos').innerHTML = datosorden[posicion].Fecha_Registro_Solicitud;
    document.getElementById('lblpaciente').innerHTML = datosorden[posicion].Id_Afiliado;
    document.getElementById('lbltiposervicio').innerHTML = datosorden[posicion].Descripcion;
    document.getElementById('lblciudad').innerHTML = datosorden[posicion].Ciudad_del_centro_generador_de_autorizacion;
    document.getElementById('lblestadoserv').innerHTML = datosorden[posicion].Fecha_Registro_Solicitud;
    document.getElementById('lbltiposerv').innerHTML = datosorden[posicion].Centro_generador_de_autorizacion;
    document.getElementById('lblFechanacimiento').innerHTML = datosorden[posicion].FechaNacimiento;

    $("#myModal").modal();
}

function ValidarOrden(posicion, posiciontabla) {

    $.ajax({
        url: "Optimizacion.aspx/validarOrden",
        data: "{ Id: '" + posicion + "'}",
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

                    swal({
                        title: swalheadertxt,
                        text: "Ya existe una orden similar que anteriormente fue optimizada!",
                        type: "warning",
                        showCancelButton: true,
                        cancelButtonText: "Volver",
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Continuar",
                        closeOnConfirm: true
                    },
                    function () {
                        document.getElementById('lblcodigo').innerHTML = datos[0].Codigo_Solicitud_Ciklos;
                        document.getElementById('lblFecha').innerHTML = datos[0].FechaCargueSistema;
                        document.getElementById('lblFechaOpt').innerHTML = datos[0].FechaOptimizacion;
                        document.getElementById('lblresponsable').innerHTML = datos[0].NombreCompleto;
                        document.getElementById('lblCups').innerHTML = datos[0].Cups;
                        document.getElementById('lbldetalle').innerHTML = datos[0].Descripcion;
                        document.getElementById('lblpacientet').innerHTML = datos[0].id_afiliado;
                        document.getElementById('lblestadoorden').innerHTML = datos[0].estadoproveedor;

                        $("#ModalOrdenRepetida").modal();


                        $("#btnOmitirOrden").on("click", function (e) {

                            swal({
                                title: swalheadertxt,
                                text: "¿Estas segur@ que la orden debe ser omitida?",
                                type: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "Si",
                                cancelButtonText: "No",
                                closeOnConfirm: false
                            }, function () {
                                GuardarOrdenRepetida(posicion);
                            });
                        });

                        $("#btnAuditarOrden").on("click", function (e) {
                            $('#ModalOrdenRepetida').modal('hide');
                            //$('#ModalOrdenRepetida').modal('toggle');
                            abrirModalAcciones(posicion, posiciontabla);
                        });

                        //swal(swalheadertxt, "La Orden se omitio correctamente.", "success");
                    });

                } else {
                    //console.log("ko")
                    abrirModalAcciones(posicion, posiciontabla);
                }
                //datos[i].FechaOptimizacion
            } else {
                swal({
                    title: swalheadertxt,
                    text: "Lo sentimos, no se pudo validar la orden, favor comunicarse con sistemas.",
                    type: "error",
                    confirmButtonText: "ACEPTAR"
                });


            }
        }
    });
}

function GuardarOrdenRepetida(posicion) {
    $.ajax({
        url: "Optimizacion.aspx/guardarOrdenrepetida",
        data: "{ Id: '" + posicion + "'}",
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
                    $('#tr_' + posicion).remove();

                    swal(swalheadertxt, "Bien, la orden se omitio correctamente", "success");
                    $('#ModalOrdenRepetida').modal('hide');

                } else {
                    swal({
                        title: swalheadertxt,
                        text: "Lo sentimos, no se pudo validar la orden, favor comunicarse con sistemas.",
                        type: "error",
                        confirmButtonText: "ACEPTAR"
                    });
                }
            } else {
                swal({
                    title: swalheadertxt,
                    text: "Lo sentimos, no se pudo validar la orden, favor comunicarse con sistemas.",
                    type: "error",
                    confirmButtonText: "ACEPTAR"
                });


            }
        }
    });

}

function abrirModalAcciones(posicion, posiciontabla) {


    //console.log(posiciontabla)

    $("#ModalAcciones .modal-body").html('');
    $("#ModalAcciones .modal-footer").html('');

    var body = '';
    var footer = '';

    body += '<div class="box_swith_mod"><p>Genero AT4:</p><label class="switch"><input id="checkAt4_' + posicion + '" type="checkbox" onclick="GeneroAt4(' + posicion + ',' + posiciontabla + ')"><span class="slider round"></span></label></div>';
    body += '<div class="box_swith_mod" style="margin-bottom:5px"><p>Adecuada:</p><label class="switch"><input id="checkAdecuado_' + posicion + '" type="checkbox" onclick="NoAdecuado(' + posicion + ',' + posiciontabla + ')"><span class="slider round"></span></label></div>';

    body += '<div class="box_swith_mod" style="margin-bottom:5px"><p>Dir. Externo:</p><label class="switch"><input id="checkDirreccio_' + posicion + '" type="checkbox" onclick="NotificacionProveExterno(' + posicion + ')"><span class="slider round"></span></label></div>';



    body += '<div id="ddl_Div_Externo' + posicion + '"><p style="margin:5px 0px 0px">Proveedor Externo:</p><select id="ddl_Externo_' + posicion + '" style="width:100%" class="js-example-basic-single js-states form-control" ></select></div>';



    body += '<div id="ddl_Div_' + posicion + '"><p style="margin:5px 0px 0px">Motivo AT4:</p><select id="ddl_Noat4_' + posicion + '" style="width:100%" class="js-example-basic-single js-states form-control" ></select></div>';

    body += '<p style="margin:5px 0px 0px">Observaciones Auditoria:</p><input type="text" onkeypress="return pulsar(event)" id="txtObservacionesAud_' + posicion + '" placeholder="Relacionadas con la atención y notas de tipo médico." class="form-control">';
    body += '<p style="margin:5px 0px 0px">Observaciones Generales:</p><input type="text" onkeypress="return pulsar(event)" id="txtObservacionesGene_' + posicion + '" placeholder="Relacionadas con cambios de servicio y datos administrativos." class="form-control">';


   
    body += '<div class="col-md-6" style="padding:0;"><p style="margin:5px 0px 0px">CIE 10:</p><input type="text" onkeypress="return pulsar(event)" id="txtCIE10_' + posicion + '" placeholder="Ingresa el código del diagnóstico." class="form-control"></div>';
    body += '<div class="col-md-6" style="padding-top:15px;text-align:center;"><input type="button" style="width: 50%; text-align: center; color: white;" class="btn btn-info" onclick="buscardiag(' + posicion + ')" value="Buscar C10" /></div>';

    body += '<input type="text" style="margin-top:2px" id="txtCIE10Desc_' + posicion + '" placeholder="Descripción del diagnóstico." class="form-control">';

    body += '<p style="margin:5px 0px 0px">Profesional Solicitante:</p><input type="text" onkeypress="return pulsar(event)" id="txtProfesional_' + posicion + '" placeholder="Ingresa el nombre del profesional." class="form-control">';

    //body += '<div id="ddl_Div_Proveedor' + posicion + '"><p style="margin:5px 0px 0px">Proveedor:</p><select id="ddl_Proveedoress_' + posicion + '" class="js-example-basic-single js-states form-control" style="width:100%"></select></div>';
    //body += '<div id="ddl_DivSede_' + posicion + '"><p style="margin:5px 0px 0px">Sede PROMEDAN:</p><select id="ddl_PromedanSede_' + posicion + '" class="js-example-basic-single js-states form-control" style="width:100%"></select></div>';
    //footer += '<button  class="btn btn-primary" data-dismiss="modal">Volver</button>';

    footer += '<div class="col-md-6"><input type="button" style="width: 50%; text-align: center; color: white;" data-dismiss="modal" class="btn btn-primary" value="Volver" /></div>';
    footer += '<div class="col-md-6"><input type="button" style="width: 50%; text-align: center; color: white;" id="btnAsignarProveedor_' + posicion + '" class="btn btn-danger" onclick="GuardarProovedor(' + posicion + ',' + 0 + ',' + posiciontabla + ')" value="Guardar" /></div>';

    //footer += '<button id="btnAsignarProveedor_' + posicion + '" class="btn btn-primary" onclick="GuardarProovedor(' + posicion + ',' + 0 + ',' + posiciontabla + ')">Guardar</button>';

    $("#ModalAcciones .modal-body").append(body);
    $("#ModalAcciones .modal-footer").append(footer);

    $('#checkAt4_' + posicion).prop('checked', true);
    $('#checkAdecuado_' + posicion).prop('checked', true);


    var noat4 = $('#ddl_Noat4_' + posicion);
    noat4.select2({
        placeholder: "Selecciona el porqué no se generó AT4"
    });
    $('#ddl_Div_' + posicion).hide();

    $('#ddl_Externo_' + posicion).select2({
        placeholder: "Selecciona el proveedor externo correspondiente"
    });
    $('#ddl_Div_Externo' + posicion).hide();

    $('#ddl_Externo_' + posicion).append('<option value="' + 0 + '">' + "" + '</option>'); //para validar si el usuario no selecciono nada
    $('#ddl_Externo_' + posicion).append('<option value="' + "Clinica las Vegas" + '">' + "Clinica las Vegas" + '</option>');
    $('#ddl_Externo_' + posicion).append('<option value="' + "Clinica Medellin" + '">' + "Clinica Medellin" + '</option>');
    $('#ddl_Externo_' + posicion).append('<option value="' + "Clinica Noel" + '">' + "Clinica Noel" + '</option>');
    $('#ddl_Externo_' + posicion).append('<option value="' + "Clinica Bolivariana" + '">' + "Clinica Bolivariana" + '</option>');
    $('#ddl_Externo_' + posicion).append('<option value="' + "Estudios Endoscopicos" + '">' + "Estudios Endoscopicos" + '</option>');



    //var proveedor = $('#ddl_Proveedoress_' + posicion);
    //proveedor.select2({
    //    placeholder: "Selecciona el Proveedor"
    //});    
    //llenarCombos(proveedor, "spsuministros_Proveedores_ObtenerNew");

    //var sedes = $('#ddl_PromedanSede_' + posicion);  
    //$('#ddl_DivSede_' + posicion).hide();

    //proveedor.on('change', function () {
    //    var value = $(this).val();

    //    if (value == "9000389264") {
    //        $('#ddl_DivSede_' + posicion).show();
    //        llenarCombos(sedes, "spGestionOrdenamientos_ObtenerCentroCosto");
    //        sedes.select2({
    //            placeholder: "Selecciona la sede Promedan"
    //        });

    //        if (datosorden[posiciontabla].IPSUsuario != null) {
    //            showNotificationOptmizacionsede('top', 'center', datosorden[posiciontabla].IPSUsuario);
    //        }           

    //    } else {            
    //        $('#ddl_DivSede_' + posicion).hide();
    //        sedes.val('').trigger('change')//limpia el combito y la descripcion
    //        sedes.html('');

    //    }
    //    //alert(value);
    //});


    $('#txtCIE10Desc_' + posicion).prop('disabled', true);
    document.getElementById('ModaltittleAcciones').innerHTML = 'Gestión de la Orden ' + datosorden[posiciontabla].Codigo_Solicitud_Ciklos;

    $('#ModalAcciones').modal({ backdrop: 'static', keyboard: false })
    $("#ModalAcciones").modal();

    //Despues de ingresar el diagnostico se detecta el ENTER
    $('#txtCIE10_' + posicion).keypress(function (e) {

    });

}

function buscardiag(posicion) {

    $('#txtCIE10Desc_' + posicion).val('');    
        //Se obtienen los valores de los controles
        var diagnostico = $('#txtCIE10_' + posicion).val();

        if (diagnostico.length == 0) {
            swal({
                title: swalheadertxt,
                text: "Lo sentimos, el campo diagnóstico no puede estar vacío, debes ingresar un diagnóstico valido, ejemplo: S017.",
                type: "info",
                confirmButtonText: "ACEPTAR"
            });


        } else {
            ObtenerDiagnosticos(diagnostico, posicion);
        }
    

}

function ObtenerDiagnosticos(diagnostico, posicion) {

    var controldiagnostico = $('#txtCIE10Desc_' + posicion);

    $.ajax({
        url: "Optimizacion.aspx/buscarDiagnostico",
        data: "{ diagnostico: '" + diagnostico + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        type: 'POST'
    }).done(function (rest) {

        if (rest.d != '') {
            //Convierte la lista Json 
            var listaDatos = JSON.parse(rest.d);

            if (listaDatos.Table.length > 0) {
                controldiagnostico.val(listaDatos.Table[0].Descripcion);
            } else {
                controldiagnostico.val('');
                swal({
                    title: swalheadertxt,
                    text: "Lo sentimos, no se encontró el diagnóstico ingresado.",
                    type: "error",
                    confirmButtonText: "ACEPTAR"
                });

            }
        }
    })
}

function GeneroAt4(posicion, posiciontabla) {


    if (!$('#checkAt4_' + posicion).is(':checked')) {

        $('#checkDirreccio_' + posicion).attr('checked', false);
        $('#checkDirreccio_' + posicion).prop("disabled", true);


        //at4 = 0;
        //oculta proveedores y restea el valor
        $('#ddl_Div_Proveedor' + posicion).hide();
        $('#ddl_Proveedoress_' + posicion).val('');

        //oculta las sedes y resetea el valor
        $('#ddl_DivSede_' + posicion).hide();
        $('#ddl_PromedanSede_' + posicion).val('');

        $('#ddl_Div_' + posicion).show();
        $('#ddl_Noat4_' + posicion).html('');
        $('#ddl_Noat4_' + posicion).append('<option value="' + 0 + '">' + "" + '</option>'); //para validar si el usuario no selecciono nada
        $('#ddl_Noat4_' + posicion).append('<option value="' + "Solicitud mal ingresada (Back1 - Back2)" + '">' + "Solicitud mal ingresada (Back1 - Back2)" + '</option>');
        $('#ddl_Noat4_' + posicion).append('<option value="' + "Error en aplicativo Ciklos" + '">' + "Error en aplicativo Ciklos" + '</option>');
        //$('#ddl_Noat4_' + posicion).append('<option value="' + "Procedimiento no contratado con la IPS del Afiliado" + '">' + "Procedimiento no contratado con la IPS del Afiliado" + '</option>');
        $('#ddl_Noat4_' + posicion).append('<option value="' + "Se redirecciona orden a EPS CON recobro" + '">' + "Se redirecciona orden a EPS CON recobro" + '</option>');
        $('#ddl_Noat4_' + posicion).append('<option value="' + "Se redirecciona orden a EPS SIN recobro" + '">' + "Se redirecciona orden a EPS SIN recobro" + '</option>');
        $('#ddl_Noat4_' + posicion).append('<option value="' + "Se anula la orden" + '">' + "Se anula la orden" + '</option>');
        $('#ddl_Noat4_' + posicion).append('<option value="' + "Se supera la cantidad de ordenes parametrizadas (Frecuencia)" + '">' + "Se supera la cantidad de ordenes parametrizadas (Frecuencia)" + '</option>');
        //$('#ddl_Noat4_' + posicion).append('<option value="' + "El servicio no es de PGP" + '">' + "El servicio no es de PGP" + '</option>');
        $('#ddl_Noat4_' + posicion).append('<option value="' + "El afiliado no tiene solicitudes pendientes de auditoría" + '">' + "El afiliado no tiene solicitudes pendientes de auditoría" + '</option>');
        //$('#ddl_Noat4_' + posicion).append('<option value="' + "Se deja pendiente" + '">' + "Se deja pendiente (P)" + '</option>');
        //$('#ddl_Noat4_' + posicion).append('<option value="' + "Otras" + '">' + "Otras" + '</option>');

    } else {
        //at4 = 1;
        $('#ddl_Div_' + posicion).hide();
        $('#ddl_Noat4_' + posicion).val('').trigger('change')
        $('#ddl_Div_Proveedor' + posicion).show();
        $('#checkDirreccio_' + posicion).prop("disabled", false);
    }

}

function NoAdecuado(posicion, posiciontabla) {

    $('#checkDirreccio_' + posicion).attr('checked', false);

    //var direccionamiento = 0;

    //if (!$('#checkDirreccio_' + posicion).is(':checked')) {
    //    direccionamiento = 0;
    //} else {
    //    direccionamiento = 1;
    //}
    //console.log(direccionamiento)
    $('#ModalAcciones').modal('hide');
    $("#Modalnoadecuado .modal-body").html('');
    $("#Modalnoadecuado .modal-footer").html('');

    var footer = '';
    var body = '';

    body += '<div class="col-lg-12 col-md-12" style="padding:0px"><p style="margin:5px 0px 0px">Motivo no Adecuada:</p><select id="txtObservacionesmotivo" class="js-example-basic-single js-states form-control" style="width:100%"></select></div>';
    body += '<div class="col-lg-12 col-md-12" style="padding:0px"><p style="margin:5px 0px 0px">Observaciones Auditoria:</p><input type="text" onkeypress="return pulsar(event)" id="txtObservacionesaud" placeholder="Relacionadas con la atención y notas de tipo médico." class="form-control"></div> ';
    body += '<div class="col-lg-12 col-md-12" style="padding:0px"><p style="margin:5px 0px 0px">Observaciones Generales:</p><input type="text" onkeypress="return pulsar(event)" id="txtObservacionesgenera" placeholder="Relacionadas con cambios de servicio y datos administrativos." class="form-control"></div>';
    body += '<div class="col-lg-12 col-md-12" style="padding-bottom:10px;padding-left:0px;padding-right:0px"><p style="margin:5px 0px 0px">Profesional Solicitante:</p><input type="text" onkeypress="return pulsar(event)" id="txtProfesionalsolicita" placeholder="Ingresa el nombre del profesional" class="form-control"></div>';



    body += '<div id="ddl_Div_Email' + posicion + '"><p style="margin:5px 0px 0px">IPS Responsable:</p><select id="ddl_SendEmail_' + posicion + '" style="width:100%" class="js-example-basic-single js-states form-control" ></select></div>';

    //body += '<div class="col-lg-12 col-md-12" style="padding-left: 180px;padding-top: 10px;padding-bottom: 10px"><div class="loader" id="loaderinadecuada_' + posicion + '" style="display: none"></div></div>';

    //Lider de IPS Responsable selecciona el Responsable de Revision ()

    footer += '<div class="col-md-6"><input type="button" style="width: 50%; text-align: center; color: white;" data-dismiss="modal" class="btn btn-primary" value="Volver" /></div>';
    footer += '<div class="col-md-6"><input type="button" style="width: 50%; text-align: center; color: white;" id="btnguardarNoAdecuado_' + posicion + '" class="btn btn-danger" onclick="GuardarProovedor(' + posicion + ',' + 1 + ',' + posiciontabla + ')" value="Guardar" /></div>';

    //footer += '<button  class="btn btn-primary" data-dismiss="modal">Cerrar</button>';
    //footer += '<button id="btnguardarNoAdecuado_' + posicion + '" class="btn btn-primary" onclick="GuardarProovedor(' + posicion + ',' + 1 + ',' + posiciontabla + ')">Guardar</button>';

    $("#Modalnoadecuado .modal-body").append(body);
    $("#Modalnoadecuado .modal-footer").append(footer);

    $("#txtObservacionesmotivo").select2({
        placeholder: "Selecciona el motivo"
    });
    $("#txtObservacionesmotivo").append('<option value="' + 0 + '">' + "" + '</option>'); //para validar si el usuario no selecciono nada
    $("#txtObservacionesmotivo").append('<option value="' + "Completar HC" + '">' + "Completar HC" + '</option>');
    $("#txtObservacionesmotivo").append('<option value="' + "Completar Estudios" + '">' + "Completar Estudios" + '</option>');
    //$("#txtObservacionesmotivo").append('<option value="' + "Anulada" + '">' + "Anulada" + '</option>');
    $("#txtObservacionesmotivo").append('<option value="' + "Repetida" + '">' + "Repetida" + '</option>');
    $("#txtObservacionesmotivo").append('<option value="' + "Innecesaria" + '">' + "Innecesaria" + '</option>');

    var cboSendemail = $('#ddl_SendEmail_' + posicion);

    cboSendemail.select2({
        placeholder: "Selecciona el responsable de realizar la revisión correspondiente"
    });
    llenarCombos(cboSendemail, "spGestionOrdenamiento_ObtenerIPSResponsable");


    document.getElementById('Modalnoadecuadotittle').innerHTML = 'Reporte de Inadecuación para la orden ' + datosorden[posiciontabla].Codigo_Solicitud_Ciklos;

    $('#Modalnoadecuado').modal({ backdrop: 'static', keyboard: false }); //bloque el clic por fuera para no minimizar
    $("#Modalnoadecuado").modal();

}

function NotificacionProveExterno(posicion) {


    if (!$('#checkDirreccio_' + posicion).is(':checked')) {

        $('#ddl_Div_Externo' + posicion).hide();
        $('#ddl_Externo_' + posicion).val('').trigger('change');

        $('#checkAt4_' + posicion).prop("disabled", false);


        //$('#checkDirreccio_' + posicion).attr('checked', false);
        //$('#checkDirreccio_' + posicion).prop("disabled", true);


        ////at4 = 0;
        ////oculta proveedores y restea el valor
        //$('#ddl_Div_Proveedor' + posicion).hide();
        //$('#ddl_Proveedoress_' + posicion).val('');

        ////oculta las sedes y resetea el valor
        //$('#ddl_DivSede_' + posicion).hide();
        //$('#ddl_PromedanSede_' + posicion).val('');


    } else {
        //at4 = 1;
        showNotificationOptmizacionsede('bottom', 'center');
        $('#ddl_Div_Externo' + posicion).show();

        $('#checkAt4_' + posicion).prop("disabled", true);


        //$('#ddl_Noat4_' + posicion).val('').trigger('change')
        //$('#ddl_Div_Proveedor' + posicion).show();
        //$('#checkDirreccio_' + posicion).prop("disabled", false);
    }

}

function showNotificationOptmizacionsede(from, align) {

    type = ['default', 'primary', 'success', 'warning', 'danger'];
    color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        message: 'La orden seleccionada se redireccionará a un proveedor externo.'
    }, {
        type: type[color],
        //type: 'danger',
        timer: 1000,
        placement: {
            from: from,
            align: align
        }
    });

}

function GuardarProovedor(posicion, opcion, posiciontabla) {

    var IdtipoOpt = sessionStorage.getItem("tipoidusuariosis");
    var IdOpt = sessionStorage.getItem("idusuariosis");

    var input, filter, table, tr, td, i;
    table = document.getElementById("tablaAsignar");
    tr = table.getElementsByTagName("tr");
    var idconsecutivo = posicion;
    //var proveedorasignado = $('#ddl_Proveedoress_' + posicion).val();
    //var sedepromedan = $('#ddl_PromedanSede_' + posicion).val();
    var proveedorasignado = '';
    var sedepromedan = '';
    var observacionesaudit = $('#txtObservacionesAud_' + posicion).val();
    var observacionesagen = $('#txtObservacionesGene_' + posicion).val();

    var noAt4motivo = $('#ddl_Noat4_' + posicion).val();
    var cie10 = $('#txtCIE10_' + posicion).val();
    var cie10desc = $('#txtCIE10Desc_' + posicion).val();
    var profesional = $('#txtProfesional_' + posicion).val();
    var at4 = 0;
    var adecuado = 0;
    var motivonadecuado = $('#txtObservacionesmotivo').val();
    var emailseleccionado = $('#ddl_SendEmail_' + posicion).val();
    
    var direccionamiento = 0;
    var proveexterno = $('#ddl_Externo_' + posicion).val();

    if (!$('#checkAt4_' + posicion).is(':checked')) {
        at4 = 0;
    } else {
        at4 = 1;
    }

    if (!$('#checkAdecuado_' + posicion).is(':checked')) {
        adecuado = 0;
    } else {
        adecuado = 1;
    }

    if (!$('#checkDirreccio_' + posicion).is(':checked')) {
        direccionamiento = 0;
    } else {
        direccionamiento = 1;
    }

    if (opcion == 1) {
        proveedorasignado = 'No Aplica';
        observacionesaudit = $('#txtObservacionesaud').val();
        observacionesagen = $('#txtObservacionesgenera').val();
        profesional = $('#txtProfesionalsolicita').val();
        at4 = 0;
        direccionamiento = 0;
        sedepromedan = 'No Aplica';
        noAt4motivo = 'No Aplica';
    } else {
        motivonadecuado = '';
    }

    if (opcion == 1 && (motivonadecuado == 0 || observacionesaudit.length == 0 || observacionesagen.length == 0 || profesional.length == 0)) {
        swal(swalheadertxt, 'Lo sentimos, debes seleccionar el motivo del porqué no es adecuada la orden y completar los demás campos para continuar.', 'warning');
    } else if (cie10.length > 0 && cie10desc.length == 0) {
        swal(swalheadertxt, 'Lo sentimos, debes ingresar un diagnóstico valido.', 'warning');
    } else if (at4 == 1 && (proveedorasignado == "0" || proveedorasignado == null || observacionesaudit.length == 0 || observacionesagen.length == 0 || cie10.length == 0 || profesional.length == 0)) {
        swal(swalheadertxt, 'Lo sentimos, debes completar todos los campos para continuar.', 'warning');
    } else if (proveedorasignado == "9000389264" && sedepromedan == "00") {
        swal(swalheadertxt, 'Lo sentimos, al seleccionar como proveedor PROMEDAN debes seleccionar una sede de la lista.', 'warning');
    } else if (at4 == 0 && adecuado == 1 && (noAt4motivo == 0 || observacionesaudit.length == 0 || observacionesagen.length == 0 || cie10.length == 0 || profesional.length == 0)) {
        swal(swalheadertxt, 'Lo sentimos, debes seleccionar el motivo del porqué no se generó AT4 y completar los demás campos para continuar.', 'warning');
    } else if (direccionamiento == 1 && (proveexterno == 0 || proveexterno == null)) {
        swal(swalheadertxt, 'Lo sentimos, debes seleccionar el proveedor externo de la lista.', 'warning');
    } else if (opcion == 1 && (emailseleccionado == 0 || emailseleccionado == null)) {
        swal(swalheadertxt, 'Lo sentimos, debes seleccionar la sede responsable para enviar una alerta por Email.', 'warning');

    } else {
        ////TEST VALUES
        //console.log(noAt4motivo)
        //console.log(at4)
        //console.log(adecuado)
        //console.log(observacionesaudit)
        //console.log(observacionesagen)
        //console.log(cie10)
        //console.log(profesional)
        //console.log(proveedorasignado)           
        //console.log(sedepromedan)
        //console.log(motivonadecuado)
        //console.log(direccionamiento)
        //console.log(proveexterno)
        //console.log(emailseleccionado)


        //observacionesaudit.replace("'", "") esto para que no saque error cuando el usuario ingrese comillas simple

        $.ajax({
            url: "Optimizacion.aspx/actualizarOrdenes",
            data: "{ tipoidoptimizador: '" + IdtipoOpt + "', optimizador: '" + IdOpt + "', idconsecutivo: '"
                + idconsecutivo + "', proveedorasignado: '" + proveedorasignado + "', observacionesaudit: '"
                + observacionesaudit.replace("'", "") + "', observacionesagen: '" + observacionesagen.replace("'", "") + "', at4: '" + at4 + "', cie10: '"
                + cie10 + "', adecuado: '" + adecuado + "', profesional: '" + profesional + "', sedepromedan: '"
                + sedepromedan + "', noAt4motivo: '" + noAt4motivo + "', motivonadecuado: '" + motivonadecuado + "', direccionamiento: '" + direccionamiento + "', proveexterno: '" + proveexterno + "'}",
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

                        if (opcion == 1) {

                            var datos1 = listaDatos.Table1;

                            //var emailasignado = datos1[0].Email;
                            //console.log(emailasignado);

                            //envia un correo con el reporte de la orden no adecuada
                            //EnviarEmailNoAdecuado(posicion);

                            //$('#loaderinadecuada_' + posicion).show();
                            EnviarEmailOrdenInnadecuada(posiciontabla, motivonadecuado, observacionesaudit, observacionesagen, profesional, emailseleccionado);
                            //borra la fila de la tabla en pantalla
                            $('#tr_' + posicion).remove();

                            totalpendientes = totalpendientes - 1;
                            document.getElementById('lbltotalpendientes').innerHTML = totalpendientes;
                            $("#ModalAcciones").modal('hide');
                            $("#Modalnoadecuado").modal('hide');

                        } else {
                            swal(swalheadertxt, 'Bien, la orden se auditó correctamente.', 'success');
                            ////tr[posiciontabla].style.display = "none";
                            //document.getElementById("tablaAsignar").deleteRow(posiciontabla);

                            //borra la fila de la tabla en pantalla
                            $('#tr_' + posicion).remove();

                            totalpendientes = totalpendientes - 1;
                            document.getElementById('lbltotalpendientes').innerHTML = totalpendientes;
                            $("#ModalAcciones").modal('hide');
                            $("#Modalnoadecuado").modal('hide');
                        }

                    } else {
                        swal(swalheadertxt, 'Lo sentimos, la orden no se auditó correctamente.', 'warning');
                    }
                }
                else {
                    swal(swalheadertxt, 'Lo sentimos, el registro no se actualizo.', 'warning');
                }
            }
        });
    }
}

function EnviarEmailOrdenInnadecuada(posiciontabla, motivonadecuado, observacionesaudit, observacionesagen, profesional, emailasignado) {

    var email = emailasignado;
    var asunto = "Reporte de Inadecuación";
    var mensaje = JSON.stringify('Reporte de Inadecuación, Equipo Optimizador Promedan IPS<br /><br />' + 'Numero de Orden:' + datosorden[posiciontabla].idConsecutivo +
        '<br /> Numero de Orden Ciklos: ' + datosorden[posiciontabla].Codigo_Solicitud_Ciklos +
        '<br /> ID Paciente: ' + datosorden[posiciontabla].Id_Afiliado +
        '<br /> Nombre Paciente: ' + datosorden[posiciontabla].NombreCompleto +
        '<br /> IPS Usuario: ' + datosorden[posiciontabla].IPSUsuario +
        '<br /> Centro Generó: ' + datosorden[posiciontabla].Centro_generador_de_autorizacion +
        '<br /> CUPS: ' + datosorden[posiciontabla].Cups +
        '<br /> Detalle 1132: ' + datosorden[posiciontabla].DescripcionNew +
        '<br /> Detalle Ciklos: ' + datosorden[posiciontabla].Descripcion +
        '<br /> Motivo de Inadecuación: ' + motivonadecuado +
        '<br /> Observaciones Generales: ' + observacionesagen +
        '<br /> Observaciones de Auditoria: ' + observacionesaudit +
        '<br /> Profesional: ' + profesional +
        '<br /> Responsable de Optimización: ' + datosorden[posiciontabla].NombreOptimizador + '<br /><br />');


    $.ajax({
        url: "Optimizacion.aspx/EnviarCorreo",
        data: "{ emails: '" + email + "',asunto:'" + asunto + "',cuerpomensaje:" + mensaje + "}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        type: 'POST'
    }).done(function (rest) {
        //$("#loaderinadecuada").hide();
        swal(swalheadertxt, 'Bien, la orden se auditó correctamente y se envió un correo al responsable asignado con el detalle de inadecuación segun la sede del usuario.', 'success');
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

function llenarCombos(combo, spP) {

    $.ajax({
        url: "Optimizacion.aspx/cargarDatos",
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