using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ReportingService.Enums;

namespace ReportingService.Dtos
{
    public class ReportDto
    {
        public string DisplayName { get;set;}
        public string ReportName { get; set; }
        //public UiDisplayType DisplayType { get; set; }
    }
}