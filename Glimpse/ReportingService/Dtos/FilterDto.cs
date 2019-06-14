using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ReportingService.Dtos
{
    public class FilterDto
    {
        public string Name { get; set; }
        public string displayName { get; set; }
        public string Type { get; set; }
        public bool PrePopulate { get; set; }
        public string StoredProcedureName { get; set; }
        public string DefaultValue { get; set; }
    }
}