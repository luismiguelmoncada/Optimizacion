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
    public partial class Proveedores : System.Web.UI.Page
    {
        AccesoDatos objRetornarDatos = new AccesoDatos();

        protected void Page_Load(object sender, EventArgs e)
        {

        }

       
        //Elimina el Proveedor asignado
        public string EliminarAsignacionProveedoresCups(string idasignacion)
        {
            try
            {
                var dtOrdenes = objRetornarDatos.llenarDataSet("spGestionOrdenamiento_EliminarAsignacionProveedoresXCups" + "'" + idasignacion + "'");
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
        public static string eliminarAsignacionProveedoresCups(string idasignacion)
        {
            try
            {
                Proveedores objOrdenesProveedor = new Proveedores();
                return objOrdenesProveedor.EliminarAsignacionProveedoresCups(idasignacion);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Guarda el proveedor asignado
        public string GuardarAsignacionProveedoresCups(string Pproveedor, string cups, string descripcion, string usuariosis)
        {
            try
            {
                var dtOrdenes = objRetornarDatos.llenarDataSet("spGestionOrdenamiento_insertarAsignacionProveedoresXCups" + "'" + Pproveedor + "','" + cups + "','" + descripcion + "','" + usuariosis + "'");
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
        public static string guardarAsignacionProveedoresCups(string Pproveedor, string cups, string descripcion, string usuariosis)
        {
            try
            {
                Proveedores objOrdenesProveedor = new Proveedores();
                return objOrdenesProveedor.GuardarAsignacionProveedoresCups(Pproveedor, cups, descripcion, usuariosis);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }




        //Guarda el proveedor asignado de Promedan
        public string GuardarAsignacionProveedoresCupsProme(string ProveedorProme, string cupsProme, string usuariosis)
        {
            try
            {
                var dtOrdenes = objRetornarDatos.llenarDataSet("spGestionOrdenamiento_insertarAsignacionProveedoresXCupsProme" + "'" + ProveedorProme + "','" + cupsProme + "','" + usuariosis + "'");
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
        public static string guardarAsignacionProveedoresCupsProme(string ProveedorProme, string cupsProme, string usuariosis)
        {
            try
            {
                Proveedores objOrdenesProveedor = new Proveedores();
                return objOrdenesProveedor.GuardarAsignacionProveedoresCupsProme(ProveedorProme, cupsProme, usuariosis);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Elimina el Proveedor asignado Pormedan
        public string EliminarAsignacionProveedoresCupsProme(string idasignacion)
        {
            try
            {
                var dtOrdenes = objRetornarDatos.llenarDataSet("spGestionOrdenamiento_EliminarAsignacionProveedoresXCupsPromedan" + "'" + idasignacion + "'");
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
        public static string eliminarAsignacionProveedoresCupsProme(string idasignacion)
        {
            try
            {
                Proveedores objOrdenesProveedor = new Proveedores();
                return objOrdenesProveedor.EliminarAsignacionProveedoresCupsProme(idasignacion);
            }
            catch (Exception ex)
            {
                throw ex;
            }
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
                Proveedores objCombos = new Proveedores();
                return objCombos.CargarDatos(sp);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }





    }
}