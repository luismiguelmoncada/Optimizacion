<%@ Page Title="" Language="C#" MasterPageFile="~/MenuPrincipal.Master" AutoEventWireup="true" CodeBehind="Proveedores.aspx.cs" Inherits="Optimizacion.Proveedores" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery/jquery-2.1.1.min.js"></script>
    <script src="js/pages/Proveedores.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="am-content">
        <div class="main-content">
            <!-- Content Header (Page header) -->
            <section class="content-header" style="padding-bottom: 20px">
                <h1>Configuración de Proveedores
                    <small>Asignación de responsables de prestar el servicio según el CUPS que corresponda</small>
                </h1>
                <ol class="breadcrumb">
                    <li><a href="#"><i class="fa fa-dashboard"></i>Level</a></li>
                    <li class="active">Here</li>
                </ol>
            </section>


            <ul class="nav nav-tabs">
                <li id="navUsuario" class="active"><a data-toggle="tab" href="#General"><i class="fa fa-sitemap"></i> Configuración Global</a></li>
                <li id="MainContent_navExamenes" runat="server"><a data-toggle="tab" href="#Promedan"><i class="fa fa-building"></i> Promedan</a></li>
            </ul>

            <div class="tab-content">
                <div id="General" class="tab-pane fade in active">


                   <%-- <div class="col-lg-12 col-md-12 helpicon">
                        <img src="images/icons8-Idea-40.png" onclick="showNotification('top','right','<b>Responsables</b><p>- Se debe seleccionar el proveedor y el cups para realizar las asignaciones.</p><p>- Algunos cups están duplicados pero tienen descripciones diferentes y solo se asignara en función del cups.</p><p>- Solo es posible asignar un cups una única vez a un proveedor sin importar que sus descripciones sean diferentes.</p>')" style="width: 30px; height: 30px" />
                    </div>--%>
                    <header class="bp-header cf">

                        <div class="col-md-10" style="padding-left: 0">
                           <%-- <h1 class="bp-header__title">Parametrización Proveedores - Cups</h1>--%>
                            <p>Asigne por cada proveedor los cups o servicios que prestara cada uno de ellos.</p>
                        </div>

                        <div class="col-md-2" style="text-align: end; padding-top: 5px">
                           <%-- <button id="btnListProveCups">Listar</button>--%>
                            <input type="button" id="btnListProveCups" class="btn btn-success" value="Listar Todos" />
                        </div>

                    </header>
                    <div>                       
                            <div class="card" style="margin: 0;margin-top:7px">
                                <div class="col-lg-12 col-md-12" data-background-color="bluee" style="padding: 15px; border-radius: 3px">

                                    <div class="col-md-3">
                                        <label class="s16 color-white">Proveedor:</label>
                                        <select id="ddlPProveedor" class="form-control color-blue" style="width: 100%"></select>
                                    </div>

                                    <div class="col-md-4">
                                        <label class="s16 color-white">Cups:</label>
                                        <select id="ddlProveedoresXCups" class="js-example-basic-single js-states form-control" style="width: 100%"></select>
                                    </div>

                                    <div class="col-md-2">
                                        <label>FILTRAR:</label>
                                        <input type="text" class="myinput1" id="txtfiltroProve" placeholder="Proveedor" onkeyup="FiltrarTablaProveedor1('txtfiltroProve','tablaProveedoresXCups','0')">
                                    </div>

                                    <div class="col-md-2">
                                        <label>FILTRAR:</label>
                                        <input type="text" class="myinput1" id="txtfiltroPrDes" placeholder="Descripción" onkeyup="FiltrarTablaProveedor1('txtfiltroPrDes','tablaProveedoresXCups','3')">
                                    </div>

                                     <div class="col-md-1" style="text-align: end; padding-top: 22px">
                                        <input type="button" id="btnAddPx" class="btn btn-warning" value="Adicionar" />
                                        <%--<button id="btnAddPx">Adicionar</button>--%>
                                    </div>

                                </div>
                            </div>

                        <div class="col-lg-12 col-md-12">
                            <div class="card-content table-responsive">
                                <div class="table-wrapper">
                                    <div class="dataTables_scrollBody table-scroll" style="overflow: auto; max-height: 360px; width: 100%;">
                                        <table id="tablaProveedoresXCups" <%--style="visibility:hidden"--%> class="table table-hover table-action">
                                            <thead>
                                                <tr>
                                                    <th><span class="text">Proveedor</span></th>
                                                    <th><span class="text">Identificación</span></th>
                                                    <th><span class="text">Cups</span></th>
                                                    <th><span class="text">Descripción</span></th>
                                                    <th><span class="text">Acción</span></th>

                                                    <%--<th>Proveedor</th>
                                                    <th>Identificación</th>
                                                    <th>Cups</th>
                                                    <th>Descripción</th>
                                                    <th>Acción</th>--%>
                                                </tr>
                                            </thead>
                                            <tbody id="bodytablaProveedoresXCups"></tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>                      

                    </div>


                </div>

                <div id="Promedan" class="tab-pane fade">

<%--                    <div class="col-lg-12 col-md-12 helpicon">
                        <img src="images/icons8-Idea-40.png" onclick="showNotification('top','right','<b>Responsables</b><p>- Se debe seleccionar el proveedor y el cups para realizar las asignaciones.</p><p>- Algunos cups están duplicados pero tienen descripciones diferentes y solo se asignara en función del cups.</p><p>- Solo es posible asignar un cups una única vez a un proveedor sin importar que sus descripciones sean diferentes.</p>')" style="width: 30px; height: 30px" />
                    </div>--%>
                    <header class="bp-header cf">


                        <div class="col-md-10" style="padding-left: 0">
                            <%--<h1 class="bp-header__title">Asignación Cups - Promedan</h1>--%>
                            <p>Asigne por cada proveedor Promedan (sede o dependencia), los servicios que prestara cada uno de ellos en base al CUPS.</p>
                        </div>

                         <div class="col-md-2" style="text-align: end; padding-top: 5px">
                            <input type="button" id="btnListaCupsProme" class="btn btn-success" value="Listar Todos" />
                            <%--<button id="btnListaCupsProme">Listar</button>--%>
                        </div>

                    </header>
                    <div>                       
                           <div class="card" style="margin: 0;margin-top:7px">
                                <div class="col-lg-12 col-md-12" data-background-color="bluee" style="padding: 15px; border-radius: 3px">

                                    <div class="col-md-3">
                                        <label class="s16 color-white">Clasificación:</label>
                                        <select id="ddlPProveedorProm" class="form-control color-blue" style="width: 100%"></select>
                                    </div>

                                    <div class="col-md-4">
                                        <label class="s16 color-white">Cups:</label>
                                        <select id="ddlProveedoresXCupsProm" class="js-example-basic-single js-states form-control" style="width: 100%"></select>
                                    </div>

                                    <div class="col-md-2">
                                        <label>FILTRAR:</label>
                                        <input type="text" class="myinput1" id="txtfiltroProveeProm" placeholder="Clasificación" onkeyup="FiltrarTablaProveedor1('txtfiltroProveeProm','tablaProveedoresXCupsPromedan','0')">
                                    </div>

                                    <div class="col-md-2">
                                        <label>FILTRAR:</label>
                                        <input type="text" class="myinput1" id="txtfiltroPrDessProm" placeholder="Descripción" onkeyup="FiltrarTablaProveedor1('txtfiltroPrDessProm','tablaProveedoresXCupsPromedan','2')">
                                    </div>

                                    <div class="col-md-1" style="text-align: end; padding-top: 22px">
                                        <input type="button" id="btnAddPromeCups" class="btn btn-warning" value="Adicionar" />
                                        <%--<button id="btnAddPromeCups">Adicionar</button>--%>
                                    </div>

                                </div>
                           </div>

                        <div class="col-lg-12 col-md-12">
                            <div class="card-content table-responsive">
                                <div class="table-wrapper">
                                    <div class="dataTables_scrollBody table-scroll" style="overflow: auto; max-height: 360px; width: 100%;">

                                        <table id="tablaProveedoresXCupsPromedan" <%--style="visibility:hidden"--%> class="table table-hover table-action">
                                            <thead>
                                                <tr>
                                                    <th><span class="text">Clasificación</span></th>
                                                    <th><span class="text">Cups</span></th>
                                                    <th><span class="text">Descripción</span></th>
                                                    <th><span class="text">Acción</span></th>
                                                    <%--<th>Clasificación</th>
                                                    <th>Cups</th>
                                                    <th>Descripción</th>
                                                    <th>Acción</th>--%>
                                                </tr>
                                            </thead>
                                            <tbody id="bodytablaProveedoresXCupsPromedan"></tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>


        </div>
    </div>
  
</asp:Content>
