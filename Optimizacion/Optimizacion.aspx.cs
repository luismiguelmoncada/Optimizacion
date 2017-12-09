using Newtonsoft.Json;
using Optimizacion.BD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.Script.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Optimizacion
{
    public partial class Optimizacion : System.Web.UI.Page
    {
        AccesoDatos objRetornarDatos = new AccesoDatos();

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        //carga los datos de los combos
        public string CargarDatos(string sp)
        {
            try
            {
                var dt = objRetornarDatos.llenarDataSet(sp);

                if (dt.Tables.Count > 0)
                {
                    return JsonConvert.SerializeObject(dt);
                }
                else
                {
                    return string.Empty;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [System.Web.Services.WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string cargarDatos(string sp)
        {
            try
            {
                Optimizacion objCombos = new Optimizacion();
                return objCombos.CargarDatos(sp);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Obtiene las ordenes asignadas por optimizador a partir del usuario logueado
        public string ConsultarOrdenesxOptimizador(string tipoidoptimizador, string idoptimizador)
        {
            try
            {
                var dtOrdenes = objRetornarDatos.llenarDataSet("spGestionOrdenamiento_ObtenerRepresaxFecha" + "'" + tipoidoptimizador + "','" + idoptimizador + "'");
                if (dtOrdenes.Tables.Count > 0)
                {
                    return JsonConvert.SerializeObject(dtOrdenes);
                }
                else
                {
                    return string.Empty;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [System.Web.Services.WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string consultarOrdenesxOptimizador(string tipoidoptimizador, string idoptimizador)
        {
            try
            {
                Optimizacion objOrdenesOptimizador = new Optimizacion();
                return objOrdenesOptimizador.ConsultarOrdenesxOptimizador(tipoidoptimizador, idoptimizador);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Validar Orden
        public string ValidarOrden(string Id)
        {
            try
            {
                var dtOrdenes = objRetornarDatos.llenarDataSet("spGestionOrdenamientos_ValidarOrden" + "'" + Id + "'");
                if (dtOrdenes.Tables.Count > 0)
                {
                    return JsonConvert.SerializeObject(dtOrdenes);
                }
                else
                {
                    return string.Empty;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [System.Web.Services.WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string validarOrden(string Id)
        {
            try
            {
                Optimizacion objOrdenesProveedor = new Optimizacion();
                return objOrdenesProveedor.ValidarOrden(Id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Guardar Orden Repetida
        public string GuardarOrdenrepetida(string Id)
        {
            try
            {
                var dtOrdenes = objRetornarDatos.llenarDataSet("spGestionOrdenamientos_GuardarOrdenrepetida" + "'" + Id + "'");
                if (dtOrdenes.Tables.Count > 0)
                {
                    return JsonConvert.SerializeObject(dtOrdenes);
                }
                else
                {
                    return string.Empty;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [System.Web.Services.WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string guardarOrdenrepetida(string Id)
        {
            try
            {
                Optimizacion objOrdenesProveedor = new Optimizacion();
                return objOrdenesProveedor.GuardarOrdenrepetida(Id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Busca los diagnostico
        public string BuscarDiagnostico(string diagnostico)
        {
            try
            {
                var dtOrdenes = objRetornarDatos.llenarDataSet("spGestionOrdenamientos_ObtenerDiagnosticos" + "'" + diagnostico + "'");
                if (dtOrdenes.Tables.Count > 0)
                {
                    return JsonConvert.SerializeObject(dtOrdenes);
                }
                else
                {
                    return string.Empty;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [System.Web.Services.WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string buscarDiagnostico(string diagnostico)
        {
            try
            {
                Optimizacion objOrdenesProveedor = new Optimizacion();
                return objOrdenesProveedor.BuscarDiagnostico(diagnostico);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Actualiza los datos de las ordenes optimizadas por el usuario tipo 1 (optmizador)
        public string ActualizarOrdenes(string tipoidoptimizador, string optimizador, string idconsecutivo, string proveedorasignado, string observacionesaudit, string observacionesagen, string at4, string cie10, string adecuado, string profesional, string sedepromedan, string noAt4motivo, string motivonadecuado, string direccionamiento, string proveexterno)
        {
            var dt = objRetornarDatos.llenarDataSet("spOrdenamientos_gestionarOrdenes" + "'" + tipoidoptimizador + "','" + optimizador + "','" + idconsecutivo + "','" + proveedorasignado + "','" + observacionesaudit + "','" + observacionesagen + "','" + at4 + "','" + cie10 + "','" + adecuado + "','" + profesional + "','" + sedepromedan + "','" + noAt4motivo + "','" + motivonadecuado + "','" + direccionamiento + "','" + proveexterno + "'");
            if (dt.Tables.Count > 0)
            {
                return JsonConvert.SerializeObject(dt);
            }
            else
            {
                return string.Empty;
            }
        }
        [System.Web.Services.WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string actualizarOrdenes(string tipoidoptimizador, string optimizador, string idconsecutivo, string proveedorasignado, string observacionesaudit, string observacionesagen, string at4, string cie10, string adecuado, string profesional, string sedepromedan, string noAt4motivo, string motivonadecuado, string direccionamiento, string proveexterno)
        {
            Optimizacion objUsuario = new Optimizacion();
            return objUsuario.ActualizarOrdenes(tipoidoptimizador, optimizador, idconsecutivo, proveedorasignado, observacionesaudit, observacionesagen, at4, cie10, adecuado, profesional, sedepromedan, noAt4motivo, motivonadecuado, direccionamiento, proveexterno);
        }


        ///////C#//////
        //Metodo de envio de correo sin adjunto
        [System.Web.Services.WebMethod]
        public static void EnviarCorreo(string emails, string asunto, string cuerpomensaje)
        {
            System.Net.Mail.MailMessage correo = new System.Net.Mail.MailMessage();
            //Correo del que se envia y nombre del correo
            correo.From = new System.Net.Mail.MailAddress("optimizacion.promedan@gmail.com", "Optimizacion Promedan");
            correo.To.Add(emails);
            correo.Subject = asunto;
            correo.Body = cuerpomensaje + "      \n Este es un mensaje automatico por favor no intente responderlo - Promedan IPS.";
            correo.IsBodyHtml = true;
            correo.Priority = System.Net.Mail.MailPriority.Normal;

            SmtpClient smtp = new SmtpClient();
            smtp.Host = "smtp.gmail.com";
            smtp.Port = 587;
            smtp.UseDefaultCredentials = false;
            //correo del que se envia y contraseña
            smtp.Credentials = new System.Net.NetworkCredential("optimizacion.promedan@gmail.com", "Optimizacion123");
            smtp.EnableSsl = true;
            smtp.Send(correo);

        }








    }
}