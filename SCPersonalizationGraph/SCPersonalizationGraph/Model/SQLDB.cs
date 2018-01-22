using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace SCPersonalizationGraph.Model
{
    public static class SQLDB
    {
        public static SqlConnection Connection = null;
        private static async Task MakeConnection()
        {
            if (Connection == null)
            {
                Connection = new SqlConnection(Startup.ConnectionString);
                await Connection.OpenAsync();
            }            
        }

        public static async Task<List<object>> GetData()
        {
            await MakeConnection();
            var ds = new DataSet("Fact_Personalization");
            var selectCommand = "SELECT * FROM Fact_Personalization";

            SqlDataAdapter adapter = new SqlDataAdapter(selectCommand, Connection);
            adapter.Fill(ds);
            if (ds.Tables.Count <= 0)
            {
                return null;
            }

            var table = ds.Tables[0];
            var datas = new List<object>();
            foreach (DataRow tableRow in table.Rows)
            {
                
                datas.Add(new
                {
                    Date = tableRow[0].ToString(), RuleSetId = tableRow[1].ToString(), TestSetId = tableRow[2].ToString(),
                    TestValues = tableRow[3].ToString(), IsDefault = tableRow[4].ToString(), Visits = tableRow[5].ToString(),
                    Value = tableRow[6].ToString(), Visitors = tableRow[7].ToString()
                });
            }

            return datas;
        }

        public static async Task<List<object>> GetSummaryByDate()
        {
            await MakeConnection();
            var ds = new DataSet("Personalization_Summary");

            var selectCommand = "SELECT Date, sum(Visits) as TotalVisits, sum(Value) as TotalValue, sum(Visitors) TotalVisitors  FROM Fact_Personalization group by Date";
            SqlDataAdapter adapter = new SqlDataAdapter(selectCommand, Connection);
            adapter.Fill(ds);
            if (ds.Tables.Count <= 0)
            {
                return null;
            }

            var table = ds.Tables[0];
            var datas = new List<object>();
            foreach (DataRow tableRow in table.Rows)
            {

                datas.Add(new
                {
                    Date = tableRow[0].ToString(),
                    TotalVisits = tableRow[1].ToString(),
                    TotalValue = tableRow[2].ToString(),
                    TotalVisitors = tableRow[3].ToString(),
                });
            }

            return datas;
        }

        public static async Task<List<object>> GetSummaryByDateAndRuleset()
        {
            await MakeConnection();
            var ds = new DataSet("Personalization_Summary");

            var selectCommand = "SELECT Date, RuleSetId, TestSetId, Sum(Visits) TotalVisits, sum(Value) TotalValue, sum(Visitors) TotalVisitors" + 
            " FROM Fact_Personalization " + 
            " group by date, rulesetid, testsetid";
            SqlDataAdapter adapter = new SqlDataAdapter(selectCommand, Connection);
            adapter.Fill(ds);
            if (ds.Tables.Count <= 0)
            {
                return null;
            }

            var table = ds.Tables[0];
            var datas = new List<object>();
            foreach (DataRow tableRow in table.Rows)
            {

                datas.Add(new
                {
                    Date = tableRow[0].ToString(),
                    RuleSetId = tableRow[1].ToString(),
                    TestSetId = tableRow[2].ToString(),
                    TotalVisits = tableRow[3].ToString(),
                    TotalValue = tableRow[4].ToString(),
                    TotalVisitors = tableRow[5].ToString()

                });
            }

            return datas;
        }

        public static async Task<List<object>> GetTestValuePercentageRuleset()

        {
            await MakeConnection();
            var ds = new DataSet("Personalization_Test_Percentage");

            var selectCommand = "SELECT RuleSetId, Sum(Visits) TotalVisits, sum(Value) TotalValue, sum(Visitors) TotalVisitors" +
            " FROM Fact_Personalization " +
            " group by rulesetid";
            SqlDataAdapter adapter = new SqlDataAdapter(selectCommand, Connection);
            adapter.Fill(ds);
            if (ds.Tables.Count <= 0)
            {
                return null;
            }

            var table = ds.Tables[0];
            var datas = new List<object>();
            foreach (DataRow tableRow in table.Rows)
            {

                datas.Add(new
                {
                    RuleSetId = tableRow[0].ToString(),
                    TotalVisits = tableRow[1].ToString(),
                    TotalValue = tableRow[2].ToString(),
                    TotalVisitors = tableRow[3].ToString()

                });
            }

            return datas;
        }

    }
}
