<%@ Page Title="" Language="C#" MasterPageFile="~/MenuPrincipal.Master" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="Optimizacion.Index" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">



     <div class="am-content">
        <div class="main-content">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <h1>Dashboard
                    <small>Datos y estadísticas</small>
                </h1>
                <ol class="breadcrumb">
                    <li><a href="#"><i class="fa fa-dashboard"></i>Level</a></li>
                    <li class="active">Here</li>
                </ol>
            </section>
            <div class="row">
                <div class="col-md-12" style="padding-top:50px">
                    <div class="row reportes_estadisticos_box">
                        <div class="col-md-2 padding4reset">
                            <div class="widget shadow widget-tile">
                                <div class="data-info">
                                    <div class="desc">Teleconceptos: Pendientes</div>
                                    <div id="tele_pendientes" data-toggle="counter" data-decimals="0" data-end="43" class="value">0</div>
                                    <div id="tele_pendientesporce" data-toggle="counter" data-decimals="3" data-end="5.6" data-suffix="%" class="value port_rept neg_down">0</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2 padding4reset">
                            <div class="widget shadow widget-tile">
                                <div class="data-info">
                                    <div class="desc">Teleconceptos: Resueltos</div>
                                    <div id="tele_resueltos" data-toggle="counter" data-decimals="0" data-end="6.504" class="value">0</div>
                                    <div id="tele_resueltosporce" data-toggle="counter" data-decimals="3" data-end="5.6" data-suffix="%" class="value port_rept">0</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2 padding4reset">
                            <div class="widget shadow widget-tile">
                                <div class="data-info">
                                    <div class="desc">Teleconceptos: Omitidos</div>
                                    <div id="tele_rechazados" data-toggle="counter" data-decimals="0" data-end="7.502.420" class="value">0</div>
                                    <div id="tele_rechazadosporce" data-toggle="counter" data-decimals="3" data-end="5.6" data-suffix="%" class="value port_rept neg_down">0</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2 padding4reset">
                            <div class="widget shadow widget-tile">
                                <div class="data-info">
                                    <div class="desc">Total Reportes</div>
                                    <div id="total_reportes" data-toggle="counter" data-decimals="0" data-end="7.89" class="value">0</div>
                                    <div data-toggle="counter" data-decimals="1" data-end="5.6" data-suffix="%" class="value port_rept">0</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2 padding4reset">
                            <div class="widget shadow widget-tile">
                                <div class="data-info">
                                    <div class="desc">Reportes Generados</div>
                                    <div id="gene_reportes" data-toggle="counter" data-decimals="0" data-end="6.504" class="value">0</div>
                                    <div data-toggle="counter" data-decimals="1" data-end="75.6" data-suffix="%" class="value port_rept">0</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="widget shadow widget-tile">
                                <div class="data-info">
                                    <div class="desc">Productividad Diaria</div>
                                    <div data-toggle="counter" data-decimals="1" data-end="0.2" class="value">0</div>
                                    <div data-toggle="counter" data-decimals="1" data-end="5.6" data-suffix="%" class="value port_rept neg_down">0</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          
        </div>
    </div>
</asp:Content>
