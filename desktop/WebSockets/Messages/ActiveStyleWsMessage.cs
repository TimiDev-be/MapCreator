using desktop.Classes;
using System;
using System.Collections.Generic;
using System.Text;

namespace desktop.WebSockets.Messages
{
    public class ActiveStyleWsMessage(Style? activeStyle) : IWsMessage
    {
        public WsMessageType MessageType { get; set; } = WsMessageType.ActiveStyle;
        public Style? ActiveStyle { get; set; } = activeStyle;
    }
}
