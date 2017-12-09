using Newtonsoft.Json;
using Optimizacion.BD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Optimizacion
{
    public partial class Login : System.Web.UI.Page
    {
        AccesoDatos objRetornarDatos = new AccesoDatos();

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        //control de usuarios e inicio de sesion
        public string ValidarUsuario(string UsuarioSistema, string Clave)
        {
            try
            {
                var dtUsuario = objRetornarDatos.llenarDataSet("spValidarUsuarioSistema" + "'" + UsuarioSistema + "','" + Clave + "'");
                if (dtUsuario.Tables.Count > 0)
                {
                    return JsonConvert.SerializeObject(dtUsuario);
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
        public static string validarUsuario(string UsuarioSistema, string Clave)
        {
            try
            {
                Login objLogin = new Login();
                return objLogin.ValidarUsuario(UsuarioSistema, Clave);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


















    }
}