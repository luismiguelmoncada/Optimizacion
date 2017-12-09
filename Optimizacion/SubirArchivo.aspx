<%@ Page Title="" Language="C#" MasterPageFile="~/MenuPrincipal.Master" AutoEventWireup="true" CodeBehind="SubirArchivo.aspx.cs" Inherits="Optimizacion.SubirArchivo" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="am-content">
        <div class="main-content">
            <!-- Content Header (Page header) -->
            <section class="content-header" style="padding-bottom: 20px">
                <h1>Importar Archivo
                    <small>Hoja de cálculo de Excel con las ordenes para ingresar al sistema</small>
                </h1>
                <ol class="breadcrumb">
                    <li><a href="#"><i class="fa fa-dashboard"></i>Level</a></li>
                    <li class="active">Here</li>
                </ol>
            </section>

            <div>
                <div class="scroll_header_fixed">
                    <div class="col-lg-6 col-md-6">
                        <label>Arrastra o selecciona el archivo en formato Excel.</label>
                        <div id="mydropzone" action="/uploads" title="Importar" class="dropzone"></div>
                        <br />
                    </div>
                    <div class="col-lg-3 col-md-3" style="text-align: center; padding-top: 50px">
                        <input type="button" id="btnProcesarArchivo" class="btn btn-warning" value="Procesar Archivo" onclick="procesarArchivo();" />
                        <%-- <button id="btnProcesarArchivo" class="btn btn-primary" onclick="procesarArchivo();">Procesar Archivo</button>--%>
                    </div>
                    <div class="col-lg-3 col-md-3" style="text-align: center; padding-top: 50px">
                        <input type="button" id="btnRepartir" class="btn btn-danger" value="Distribuir Cups" />
                        <%--<button id="btnRepartir" class="btn btn-primary">Distribuir Cups</button>--%>
                    </div>

                    <div class="col-lg-12 col-md-12"></div>
                    <!-- indicador de wait -->
                    <div class="col-lg-5 col-md-5"></div>
                    <div class="col-lg-5 col-md-5">
                        <div class="loader" id="loaderepartir" style="display: none"></div>
                    </div>

                    <div class="col-lg-12 col-md-12 col-sm-12" style="text-align: end">
                        <label onclick="ExportToExcelRepartir()" style="font: menu"><u>Ver detalle</u></label>
                    </div>


                    <div class="col-lg-12 col-md-12">

                        <div class="card">
                            <div class="card-header" data-background-color="bluee">
                                <h4 class="title">Listado de Asignaciones</h4>
                                <p class="category">Asignaciones realizadas después de realizar la actualización de nuevas ordenes y responsables.</p>
                            </div>
                            <div class="card-content table-responsive">
                                <table id="tablaRepartir" class="table table-hover table-action">
                                    <thead>
                                        <tr>
                                            <th>Tipo ID</th>
                                            <th>Identificacion</th>
                                            <th>Nombre Completo</th>
                                            <th>CUPS</th>
                                            <th>Total Asignado</th>
                                            <th>Total Ordenes</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

</asp:Content>
