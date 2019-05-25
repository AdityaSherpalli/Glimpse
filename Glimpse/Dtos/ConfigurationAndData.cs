using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ReportingService.Dtos
{
    public class ConfigurationAndData
    {
        public ConfigurationDto Configuration { get;set;}
        public List<EmployeeDto> Data { get; set; }
    }
}