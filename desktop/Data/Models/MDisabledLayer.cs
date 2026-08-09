using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace desktop.Data.Models
{
    public class MDisabledLayer
    {
        [JsonInclude]
        public Guid Id { get; private set; } = Guid.NewGuid();
        public string LayerId { get; set; } = string.Empty;
        public Guid MapStyleId { get; set; }
        public MDisabledLayer()
        {
            
        }
        [JsonConstructor]
        public MDisabledLayer(Guid id, string layerId, Guid mapStyleId)
        {
            Id = id;
            LayerId = layerId;
            MapStyleId = mapStyleId;
        }
    }
}
