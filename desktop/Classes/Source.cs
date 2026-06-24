using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace desktop.Classes
{
    public class Source(List<JsonElement> maps, List<JsonElement> Templates)
    {
        [JsonPropertyName("id")]
        public string Id { get; set; } = "source-of-user-data";
        [JsonPropertyName("maps")]
        public List<JsonElement> Maps { get; set; } = maps;
        [JsonPropertyName("templates")]
        public List<JsonElement> Templates { get; set; } = Templates;

        public AppData GetSource() {
            return new AppData(JsonSerializer.Serialize(this));
        }
    }
}
