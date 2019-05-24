﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ReportingService.Dtos
{
    public class ConfigDto
    {
        public List<ReportDto> Reports { get; set; }
        public List<ConfigurationDto> Configuration { get; set; }
    }
}