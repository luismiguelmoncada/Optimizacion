<%@ Page Title="" Language="C#" MasterPageFile="~/MenuPrincipal.Master" AutoEventWireup="true" CodeBehind="Optimizacion.aspx.cs" Inherits="Optimizacion.Optimizacion" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery/jquery-2.1.1.min.js"></script>
    <script src="js/pages/Optimizacion.js"></script>   
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="am-content">
        <div class="main-content">
             <!-- Content Header (Page header) -->
            <section class="content-header" style="padding-bottom: 20px">
                <h1>Optimización de Ordenamientos
                    <small>Listado de ordenes asignadas para auditar en simultáneo con el aplicativo Ciklos de Coomeva</small>
                </h1>
                <ol class="breadcrumb">
                    <li><a style="cursor:pointer" onclick="showNotification('top','right','<b>Responsables</b><p>- Se debe seleccionar el responsable y el cups para realizar las asignaciones.</p><p>- Algunos cups están duplicados pero tienen descripciones diferentes y solo se asignara en función del cups.</p><p>- Solo es posible asignar un cups una única vez a un responsable sin importar que sus descripciones sean diferentes.</p>')"><i class="fa fa-dashboard"></i>Ayuda</a></li>
                    <li class="active">Here</li>
                </ol>
            </section>
           <%-- <div class="col-lg-12 col-md-12 helpicon">
                <img src="images/icons8-Idea-40.png" onclick="showNotification('top','right','<b>Optimización</b><p>- Se muestran 40 ordenes en pantalla, cuando sean todas auditadas es necesario listar de nuevo (Botón Listar).</p><p>- Las ordenes se organizan en función de la fecha que se subió al sistema, primero las más antiguas.</p><p>- En el detalle de la orden se pueden visualizar datos importantes como la fecha de nacimiento del usuario, entre otros.</p>')" style="width: 30px; height: 30px" />
            </div>--%>
            <header class="bp-header cf">
              <%--  <h1 id="headeroptimizacion" class="bp-header__title">Asignar Orden Liberada - Optimización</h1>--%>
                <p id="optimi">Favor consultar las ordenes asignadas y realizar el proceso de Optimización.</p>
                <%--<button type="button" id="SendEmail" class="btn btn-success">Email</button>--%>
            </header>
            <div>
                <%-- <div class="scroll_header_fixed">   --%>

               
                    <div class="card"  style="margin: 0;margin-top:7px">
                        <div class="col-lg-12 col-md-12" data-background-color="bluee"  style="padding: 15px; border-radius: 3px">
                                <div class="col-md-1">
                                    <label>ASIGNADAS:</label>
                                    <label id="lbltotalasignados" style="font-size:30px"></label>
                                </div>

                                <div class="col-md-1">
                                    <label>PENDIENTES:</label>
                                    <label id="lbltotalpendientes" style="font-size:30px"></label>
                                </div>

                                <div class="col-md-1">
                                    <label>VENCIDAS:</label>
                                    <label id="lbltotalvencidas" style="font-size:30px"></label>
                                </div>

                                <div class="col-md-2">
                                    <label>FILTRAR:</label>
                                    <input class="myinput1" type="text" onkeypress="return pulsar(event)" id="txtfiltroips" placeholder="IPS Usuario" onkeyup="FiltrarTablaProveedor1('txtfiltroips','tablaAsignar','4')">
                                </div>
                                
                                <div class="col-md-2">
                                    <label>FILTRAR:</label>
                                    <input class="myinput1" type="text" onkeypress="return pulsar(event)" id="txtfiltroCentroGene" placeholder="Centro Generó" onkeyup="FiltrarTablaProveedor1('txtfiltroCentroGene','tablaAsignar','5')">
                                </div>

                                <div class="col-md-2">
                                    <label>FILTRAR:</label>
                                    <input class="myinput1" type="text" onkeypress="return pulsar(event)" id="txtfiltroDescripcin" placeholder="Descripción" onkeyup="FiltrarTablaProveedor1('txtfiltroDescripcin','tablaAsignar','6')"">
                                </div>

                                  <div class="col-md-2">
                                    <label>FILTRAR:</label>
                                    <input class="myinput1" type="text" onkeypress="return pulsar(event)" id="txtfiltrdsoespecialidadd" placeholder="Especialidad" onkeyup="FiltrarTablaProveedor1('txtfiltrdsoespecialidadd','tablaAsignar','7')"">
                                </div>

                                <div class="col-md-1" style="text-align: end; padding-top: 25px">
                                    <input type="button" id="btnActualizartabla" class="btn btn-success" value="Listar" />
                                    <%--<button id="btnActualizartabla">Listar</button>--%>
                                </div>

                            </div>
                      <div class="col-lg-12 col-md-12" style="padding:0">     
                        <div class="card-content table-responsive">
                                <%-- <div class="scroll_header_fixed">--%>
                                <div class="table-wrapper">
                                    <div class="dataTables_scrollBody table-scroll" style="overflow: auto; max-height: 360px; width: 100%;">
                                        <table id="tablaAsignar" class="table table-hover table-action">
                                            <thead>
                                                <tr>
                                                    <th><span class="text">Numero AT</span></th>
                                                    <th><span class="text">Fecha Sistema</span></th>
                                                    <th><span class="text">Dias</span></th>
                                                    <th><span class="text">Usuario</span></th>     
                                                    <th><span class="text">IPS Usuario (EVO)</span></th>
                                                    <th><span class="text">Centro Generó</span></th>
                                                    <th><span class="text">Descripción</span></th>                                                   
                                                    <th><span class="text">Especialidad</span></th>
                                                    <th><span class="text">Detalle</span></th>
                                                    <th><span class="text">Acción</span></th>
                                                </tr>
                                            </thead>
                                            <tbody id="bodytablaAsignar"></tbody>
                                        </table>
                                        <%-- </div>--%>
                                    </div>
                                </div>
                            </div>
                           </div>

                        </div>
                  


                <%-- </div>--%>
            </div>

            <div class="container">
                <!-- Modal para ingresar al detalle -->
                <div class="modal fade" id="myModal" role="dialog">
                    <div class="modal-dialog">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 id="myModaltittle"></h4>
                                <button class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            </div>
                            <div class="modal-body">
                                <div class="cinta_whit_sh">
                                    <span>Fecha Registro Ciklos:</span>
                                    <label id="lblfechacicklos"></label>
                                </div>
                                <div class="cinta_whit_sh">
                                    <span>Paciente:</span>
                                    <label id="lblpaciente"></label>
                                </div>

                                <div class="cinta_whit_sh">
                                    <span>Fecha Nacimiento Paciente:</span>
                                    <label id="lblFechanacimiento"></label>
                                </div>
                                                                
                                <div class="cinta_whit_sh">
                                    <span>Ciudad:</span>
                                    <label id="lblciudad"></label>
                                </div>
                                <div class="cinta_whit_sh">
                                    <span>Fecha Registro Ciklos:</span>
                                    <label id="lblestadoserv"></label>
                                </div>
                                <div class="cinta_whit_sh">
                                    <span>Centro Generador de la Autorización:</span>
                                    <label id="lbltiposerv"></label>
                                </div>

                                <div style="text-align:center" >
                                    <span>Servicio CIKLOS:</span>
                                    <label id="lbltiposervicio" style="color:#00bdda"></label>
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container">
                <!-- Modal para ingresar al detalle de una orde repetida -->
                <div class="modal fade" id="ModalOrdenRepetida" role="dialog">
                    <div class="modal-dialog">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header" style="padding-bottom: 0px">
                                <h4 id="ModaltittleOrdenRepetida">Detalle de la Orden ya Optimizada</h4>
                                <button class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            </div>
                            <div class="modal-body">

                                <div class="cinta_whit_sh">
                                    <span>Codigo Ciklos:</span>
                                    <label id="lblcodigo"></label>
                                </div>

                                <div class="cinta_whit_sh">
                                    <span>Fecha Registro:</span>
                                    <label id="lblFecha"></label>
                                </div>

                                <div class="cinta_whit_sh">
                                    <span>Fecha Optimización:</span>
                                    <label id="lblFechaOpt"></label>
                                </div>

                                <div class="cinta_whit_sh">
                                    <span>Persona Optimizó:</span>
                                    <label id="lblresponsable"></label>
                                </div>

                                 <div class="cinta_whit_sh">
                                    <span>Estado Orden:</span>
                                    <label id="lblestadoorden"></label>
                                </div>

                                <div class="cinta_whit_sh">
                                    <span>Paciente:</span>
                                    <label id="lblpacientet"></label>
                                </div>

                                <div class="cinta_whit_sh">
                                    <span>Cups:</span>
                                    <label id="lblCups"></label>
                                </div>

                                <div>
                                    <label id="lbldetalle" style="text-align: center"></label>
                                </div>



                            </div>
                            <div class="modal-footer">
                                <button type="button" id="btnOmitirOrden" class="btn btn-success">Omitir Orden</button>
                                <button type="button" id="btnAuditarOrden" class="btn btn-success">Auditar Orden</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="ModalAcciones" role="dialog">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header" style="padding: 0px">
                            <button class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 id="ModaltittleAcciones"></h4>
                        </div>
                        <div class="modal-body" style="padding-top: 5px">
                        </div>
                        <div class="modal-footer" style="padding-top: 0px; padding-bottom: 0px">
                        </div>
                    </div>
                </div>
            </div>


            <div class="container">
                <!-- Modal para ingresar al detalle -->
                <div class="modal fade" id="Modalnoadecuado" role="dialog">
                    <div class="modal-dialog">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header" style="padding-bottom: 0px">
                                <h4 id="Modalnoadecuadotittle"></h4>
                                <button class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            </div>
                            <div class="modal-body" style="padding-top: 0px">
                            </div>
                            <div class="modal-footer">
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </div>
    </div>
</asp:Content>
