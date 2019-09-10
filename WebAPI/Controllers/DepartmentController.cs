using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class DepartmentController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable tabel = new DataTable();

            string query = @"SELECT DepartmentID, DepartmentName
                             FROM Department";

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(tabel);
            }

            return Request.CreateResponse(HttpStatusCode.OK, tabel);

        }

        public string Post(Department dep)
        {
            try
            {
                DataTable tabel = new DataTable();

                string query = @"INSERT INTO Department values('"+dep.DepartmentName+@"')";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(tabel);
                }

                return "Added Successfully";
            }
            catch (Exception)
            {
                return "Failed to add.";
            }
        }

        public string Put(Department dep)
        {
            try
            {
                DataTable tabel = new DataTable();

                string query = @"UPDATE Department SET DepartmentName='"+dep.DepartmentName+@"'
                                where DepartmentID="+dep.DepartmentID+@"";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(tabel);
                }

                return "Updated Successfully";
            }
            catch (Exception)
            {
                return "Failed to update.";
            }
        }

        public string Delete(int id)
        {
            try
            {
                DataTable tabel = new DataTable();

                string query = @"DELETE FROM Department WHERE DepartmentID=" + id;

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(tabel);
                }

                return "Deleted Successfully";
            }
            catch (Exception)
            {
                return "Failed to delete.";
            }
        }
    }
}
