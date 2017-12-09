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
    public partial class Responsables : System.Web.UI.Page
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
                Responsables objCombos = new Responsables();
                return objCombos.CargarDatos(sp);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Guarda el responsable asignado
        public string GuardarAsignacionResponsable(string IdTipoId, string Identificacion, string Cups, string descripcion, string usuariosis)
        {
            try
            {
                var dtOrdenes = objRetornarDatos.llenarDataSet("spGestionOrdenamiento_insertarAsignacionResponsable" + "'" + IdTipoId + "','" + Identificacion + "','" + Cups + "','" + descripcion + "','" + usuariosis + "'");
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
        public static string guardarAsignacionResponsable(string IdTipoId, string Identificacion, string Cups, string descripcion, string usuariosis)
        {
            try
            {
                Responsables objOrdenesProveedor = new Responsables();
                return objOrdenesProveedor.GuardarAsignacionResponsable(IdTipoId, Identificacion, Cups, descripcion, usuariosis);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Elimina el responsable asignado
        public string EliminarAsignacionResponsable(string idasignacion)
        {
            try
            {
                var dtOrdenes = objRetornarDatos.llenarDataSet("spGestionOrdenamiento_EliminarAsignacionResponsable" + "'" + idasignacion + "'");
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
        public static string eliminarAsignacionResponsable(string idasignacion)
        {
            try
            {
                Responsables objOrdenesProveedor = new Responsables();
                return objOrdenesProveedor.EliminarAsignacionResponsable(idasignacion);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }




    }
}