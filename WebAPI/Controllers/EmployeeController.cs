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
    public class EmployeeController : ApiController
    {

        public HttpResponseMessage Get()
        {
            DataTable tabel = new DataTable();

            string query = @"SELECT EmployeeID, EmployeeName, Department, MailID, convert(varchar(10), DOJ, 120) AS DOJ
                                 FROM Employees";

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(tabel);
            }

            return Request.CreateResponse(HttpStatusCode.OK, tabel);

        }

        public string Post(Employee emp)
        {
            try
            {
                string doj = emp.DOJ.ToString().Split(' ')[0];

                DataTable tabel = new DataTable();

                string query = @"INSERT INTO Employees(
                                  EmployeeName,
                                  Department,
                                  MailID,
                                  DOJ) 
                                  Values
                                  (
                                    '"+ emp.EmployeeName+ @"'
                                    ,'"+emp.Department+@"'
                                    ,'"+emp.MailID+@"'
                                    ,'"+emp.DOJ+@"'
                                    )";

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

        public string Put(Employee emp)
        {
            try
            {
                DataTable tabel = new DataTable();

                string query = @"UPDATE Employees SET EmployeeName='" + emp.EmployeeName + @"',
                                                      Department='" + emp.Department + @"',
                                                      MailID='" + emp.MailID + @"',
                                                      DOJ='" + emp.DOJ + @"'
                                                      WHERE EmployeeID=" + emp.EmployeeID + @"";

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

                string query = @"DELETE FROM Employees WHERE EmployeeID=" + id;

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
