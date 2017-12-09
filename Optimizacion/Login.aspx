<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="Optimizacion.Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8">
    <title>Login | LifeCYCLE </title>
    <!-- Mobile specific metas -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1 user-scalable=no">
    <!-- Force IE9 to render in normal mode -->
    <!--[if IE]><meta http-equiv="x-ua-compatible" content="IE=9" /><![endif]-->
    <meta name="author" content="Luis Miguel M" />
    <meta name="description" content="Optimización Ordenamientos" />
    <meta name="keywords" content="" />
    <meta name="application-name" content="Optimización" />
    <!-- Import google fonts - Heading first/ text second -->
    <link href='http://fonts.googleapis.com/css?family=Quattrocento+Sans:400,700' rel='stylesheet' type='text/css'>
    <!-- Css files -->
    <!-- Icons -->
    <link href="css/icons.css" rel="stylesheet" />
    <!-- Bootstrap stylesheets (included template modifications) -->
    <link href="css/bootstrap.css" rel="stylesheet" />
    <!-- Plugins stylesheets (all plugin custom css) -->
    <link href="css/plugins.css" rel="stylesheet" />
    <!-- Main stylesheets (template main css file) -->
    <link href="css/main.css" rel="stylesheet" />
    <!-- Custom stylesheets ( Put your own changes here ) -->
    <link href="css/custom.css" rel="stylesheet" />
    <link rel="icon" href="img/ico/favicon.ico" type="image/png">
    <meta name="msapplication-TileColor" content="#3399cc" />
</head>
<body class="login-page">
    <!-- Start login container -->
    <div class="container login-container">
        <div class="login-panel panel panel-default plain animated bounceIn">
            <!-- Start .panel -->
            <div class="panel-heading">
                <h4 class="panel-title text-center">
                    <img id="logo" src="img/logo-dark.png" alt="Dynamic logo">
                </h4>
            </div>
            <div class="panel-body">
                <form class="form-horizontal mt0" <%--action="Index.aspx"--%> action="javascript:iniciarSesion();" id="login-form" role="form">
                    <div class="form-group">
                        <div class="col-lg-12">
                            <div class="input-group input-icon">
                                <span class="input-group-addon"><i class="fa fa-user"></i></span>
                                <input type="text" name="email" id="email" class="form-control" value="lenycz" placeholder="Usuario">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-lg-12">
                            <div class="input-group input-icon">
                                <span class="input-group-addon"><i class="fa fa-unlock-alt"></i></span>
                                <input type="password" name="password" id="password" class="form-control" value="l8429" placeholder="Contraseña">
                            </div>
                        </div>
                    </div>
                    <div class="form-group mb0">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="checkbox-custom">
                                <input type="checkbox" name="remember" id="remember" value="option">
                                <label for="remember">Recordarme ?</label>
                            </div>
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12" style="text-align: center; padding-top: 20px; padding-bottom: 10px">
                            <button class="btn btn-default" type="submit" id="btn_login">Iniciar Sesion</button>
                        </div>
                        <p class="text-center">&copy;2017 - PROMEDAN IPS</p>
                    </div>
                </form>
            </div>
        </div>
        <!-- End .panel -->
    </div>
    <!-- End login container -->

    <!-- Javascripts -->
    <!-- Important javascript libs(put in all pages) -->

    <!-- Jquery -->
    <script src="js/jquery/jquery-2.1.1.min.js"></script>
    <script>
        window.jQuery || document.write('<script src="assets/js/libs/jquery-2.1.1.min.js">\x3C/script>')
    </script>
    <script src="http://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
    <script>
        window.jQuery || document.write('<script src="assets/js/libs/jquery-ui-1.10.4.min.js">\x3C/script>')
    </script>

    <!-- Bootstrap plugins -->
    <script src="js/bootstrap/bootstrap.js"></script>
    <!-- Form plugins -->
    <script src="plugins/forms/validation/jquery.validate.js"></script>
    <script src="plugins/forms/validation/additional-methods.min.js"></script>
    <!-- Init plugins olny for this page -->
    <script src="js/pages/login.js"></script>
    <script src="js/sweet-alert.js"></script>

</body>
</html>
