using System;
using System.Collections.Generic;
using System.Security.Policy;
using System.Text;
using System.Text.Json.Serialization;

namespace desktop.Classes
{
    class UrlData(string? StyleUrl)
    {
        [JsonPropertyName("styleUrl")]
        public string? StyleUrl { get; set; } = StyleUrl;
    }
}
