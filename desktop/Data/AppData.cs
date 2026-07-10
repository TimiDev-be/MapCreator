using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace desktop.Data
{
    public class AppData
    {
        [JsonPropertyName("data")]
        public string? Data { get; set; } = null;

        public AppData() { }
        public AppData(string? data) { Data = data; }
    }
}
