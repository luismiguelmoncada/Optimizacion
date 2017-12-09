using Newtonsoft.Json;
using Optimizacion.BD;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Optimizacion
{
    public partial class SubirArchivo : System.Web.UI.Page
    {
        AccesoDatos objRetornarDatos = new AccesoDatos();
        String archivo;

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        //procesa el archivo excel adjunto
        public string ProcesarArchivo(string Archivo)
        {
            string SaveLocation = Server.MapPath(@"~\Documentos") + "\\" + Archivo;
            DataSet dsImportar = new DataSet();
            string Sql = @"Select * From [Hoja1$]";
            OleDbConnection cnn = new OleDbConnection(@"Provider=Microsoft.ACE.OLEDB.12.0;Data Source= " + SaveLocation + "; Extended Properties=Excel 8.0");
            OleDbDataAdapter da = new OleDbDataAdapter(Sql, cnn);
            cnn.Open();
            da.Fill(dsImportar);
            if (dsImportar.Tables.Count > 0)
            {
                using (SqlBulkCopy bulkcopy = new SqlBulkCopy(objRetornarDatos.retonarStringConexion(), SqlBulkCopyOptions.KeepIdentity & SqlBulkCopyOptions.KeepNulls))
                {
                    bulkcopy.DestinationTableName = "A_estructura_carge_represa_Ciklos";
                    bulkcopy.WriteToServer(dsImportar.Tables[0]);
                    bulkcopy.Close();
                }
            }
            return "OK";
        }
        [System.Web.Services.WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string procesarArchivo(string Archivo)
        {
            try
            {
                SubirArchivo objProcesar = new SubirArchivo();
                return objProcesar.ProcesarArchivo(Archivo);
            }
            catch (Exception ex)
            {
                //throw ex;
                return "KO";
            }
        }

        //Distribuye las ordenes
        public string ActualizarDistribuir_Ordenes(string IdtipoOpt, string IdOpt)
        {
            try
            {
                var dtOrdenes = objRetornarDatos.llenarDataSet("spGestionOrdenamientos_asignarCUPSResposables" + "'" + IdtipoOpt + "','" + IdOpt + "'");
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
        public static string actualizarDistribuir_Ordenes(string IdtipoOpt, string IdOpt)
        {
            try
            {
                SubirArchivo objOrdenesProveedor = new SubirArchivo();
                return objOrdenesProveedor.ActualizarDistribuir_Ordenes(IdtipoOpt, IdOpt);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}