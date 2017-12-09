<%@ Page Title="" Language="C#" MasterPageFile="~/MenuPrincipal.Master" AutoEventWireup="true" CodeBehind="Responsables.aspx.cs" Inherits="Optimizacion.Responsables" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/jquery/jquery-2.1.1.min.js"></script>
    <script src="js/pages/Responsables.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
 <div class="am-content">
        <div class="main-content">
            <!-- Content Header (Page header) -->
            <section class="content-header" style="padding-bottom: 20px">
                <h1>Asignación de Responsables
                    <small>Configuración del sistema</small>
                </h1>
                <ol class="breadcrumb">
                    <li><a style="cursor:pointer" onclick="showNotification('top','right','<b>Responsables</b><p>- Se debe seleccionar el responsable y el cups para realizar las asignaciones.</p><p>- Algunos cups están duplicados pero tienen descripciones diferentes y solo se asignara en función del cups.</p><p>- Solo es posible asignar un cups una única vez a un responsable sin importar que sus descripciones sean diferentes.</p>')"><i class="fa fa-dashboard"></i>Ayuda</a></li>
                    <li class="active">Here</li>
                </ol>
            </section>
               <%--<div class="col-lg-12 col-md-12 helpicon">
                <img src="images/icons8-Idea-40.png" onclick="showNotification('top','right','<b>Responsables</b><p>- Se debe seleccionar el responsable y el cups para realizar las asignaciones.</p><p>- Algunos cups están duplicados pero tienen descripciones diferentes y solo se asignara en función del cups.</p><p>- Solo es posible asignar un cups una única vez a un responsable sin importar que sus descripciones sean diferentes.</p>')" style="width: 30px; height: 30px" />
            </div>--%>
            <header class="bp-header cf">

                <div class="col-md-10" style="padding-left: 0">
                   <%-- <h1 class="bp-header__title">Asignación de Responsables</h1>--%>
                    <p>Seleccione el personal que va a realizar la optimización de las ordenes según el CUPS.</p>
                </div>

                <div class="col-md-2" style="text-align: end;">
                   <%-- <button id="btnListResponsables">Listar</button>--%>
                     <input type="button" id="btnListResponsables" class="btn btn-success" value="Listar Todos" />
                </div>


                <%-- <div class="col-md-3">
                    <label class="s16">Responsable:</label>
                    <select id="selecttest" class="js-example-basic-single js-states form-control" multiple="multiple">
                        <option value="AL">Alabama</option>
                        <option value="WY">Wyoming</option>
                    </select>
                </div>--%>
            </header>
            <div>             
                <div class="card" style="margin: 0;margin-top:7px">
                    <div class="col-lg-12 col-md-12" data-background-color="bluee" style="padding: 15px; border-radius: 3px">

                        <div class="col-md-3">
                            <label class="s16 color-white">Responsable:</label>
                            <select id="ddlEmpleado" class="form-control color-blue" style="width: 100%"></select>
                        </div>

                        <div class="col-md-4">
                            <label class="s16 color-white">Cups:</label>
                            <select id="ddlCups" class="js-example-basic-single js-states form-control" style="width: 100%"></select>
                        </div>

                        <div class="col-md-2">
                            <label>FILTRAR:</label>
                            <input type="text" class="myinput1" id="txtfiltroRespon" placeholder="Responsable" onkeyup="FiltrarResponsables()">
                        </div>

                          <div class="col-md-2">
                            <label>FILTRAR:</label>
                            <input type="text" class="myinput1" id="txtfiltroDescri" placeholder="Descripción"onkeyup="FiltrarTablaProveedor1('txtfiltroDescri','tablaParametros','3')">
                        </div>

                        <div class="col-md-1" style="text-align: end; padding-top: 22px">
                             <input type="button" id="btnAdd" class="btn btn-warning" value="Adicionar" />
                            <%--<button id="btnAdd">Adicionar</button>--%>
                        </div>

                    </div>
                </div>

                  <div class="col-lg-12 col-md-12" style="padding:0">
                      <div class="card-content table-responsive">
                       <div class="table-wrapper">    
                          <div class="dataTables_scrollBody table-scroll" style="overflow: auto; max-height: 390px; width: 100%;">
                          <%-- <div class="table-scroll">--%>
                              <table id="tablaParametros" <%--style="visibility:hidden"--%> class="table table-hover table-action">
                                  <thead>
                                      <tr>
                                           <th><span class="text">Responsable</span></th>
                                           <th><span class="text">Identificación</span></th>
                                           <th><span class="text">Cups</span></th>
                                           <th><span class="text">Descripción</span></th>
                                           <th><span class="text">Acción</span></th>

<%--                                          <th>Responsable</th>
                                          <th>Identificación</th>
                                          <th>Cups</th>
                                          <th>Descripción </th>
                                          <th>Acción</th>--%>
                                      </tr>
                                  </thead>
                                  <tbody id="bodytablaParametros"></tbody>
                              </table>
                          </div>
                        </div>
                      </div>
                  </div>


               

             

            </div>
          
        </div>
    </div>
</asp:Content>