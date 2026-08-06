using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace desktop.WebSockets.Messages
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum WsMessageType
    {
        ActiveStyle,
    }
    public interface IWsMessage
    {
        public WsMessageType MessageType { get; set; }
    }
}
