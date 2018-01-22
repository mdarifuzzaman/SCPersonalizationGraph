using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SCPersonalizationGraph.Model;
using Sitecore.Framework.Runtime.Configuration;

namespace SCPersonalizationGraph.Controllers
{
    [Route("api/[controller]")]
    public class GraphController:Controller
    {
        private readonly ILogger<GraphController> _logger;
        
        public GraphController(ILogger<GraphController> logger)
        {

            this._logger = logger;
            this._logger.LogInformation($"GraphController: loaded");
        }

        [HttpGet, Produces("application/json")]
        public async Task<ActionResult> Get()
        {
            var datas = await SQLDB.GetData();
            var summaryData = await SQLDB.GetSummaryByDate();
            var summaryRulesetData = await SQLDB.GetSummaryByDateAndRuleset();
            var testValuePercentage = await SQLDB.GetTestValuePercentageRuleset();
            return this.Ok(new
            {
                RawData = datas,
                SummaryData = summaryData,
                SummaryByRuleset = summaryRulesetData,
                TestValuePercentage = testValuePercentage
            });
        }        
    }
}
