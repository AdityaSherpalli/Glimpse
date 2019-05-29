using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace ReportingService.Services
{
    public interface IJsonSerializer
    {
        string Serialize(object obj);
        T Deserialize<T>(string stringVal);
    }
    public class JsonSerializer : IJsonSerializer
    {
        public string Serialize(object obj)
        {
            return JsonConvert.SerializeObject(obj);
        }
        public T Deserialize<T>(string stringVal)
        {
            return JsonConvert.DeserializeObject<T>(stringVal);
        }
    }
}