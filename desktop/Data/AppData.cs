using desktop.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace desktop.Data
{
    public class AppData
    {
        [JsonPropertyName("source")]
        public MSource Source { get; set; } = new MSource();
        public AppData()
        {
            
        }
        public AppData(MSource Source)
        {
            this.Source = Source;
        }
    }
}
