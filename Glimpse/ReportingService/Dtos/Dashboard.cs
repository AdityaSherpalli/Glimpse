using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ReportingService.Dtos
{
    public class Dashboard
    {
        public string Id { get; set; }
        public string Type { get; set; }
        public string DisplayName { get; set; }
        public string SpName { get; set; }
    }
}