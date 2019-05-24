using System.Collections.Generic;

namespace ReportingService.Dtos
{
    public class ConfigurationDto
    {
        public string ReportName { get; set; }
        public string StoredProcedureName { get; set; }
        public List<SqlParamDto> Parameters { get; set; }
    }
}