using System;
using System.Collections.Generic;
using System.Net.WebSockets;
using System.Text;

namespace desktop.WebSockets
{
    public static class WsStylesEcho
    {
        public static async Task HandleStylesStream(WebSocket webSocket, IWsStyleManager wsStyleManager, string userId)
        {
            var buffer = new byte[1024 * 4];
            var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

            while (!result.CloseStatus.HasValue)
            {
                await webSocket.SendAsync(new ArraySegment<byte>(buffer, 0, result.Count), result.MessageType, result.EndOfMessage, CancellationToken.None);
                result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            }

            wsStyleManager.RemoveStyleSocket(userId);
            await webSocket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);
        }
    }
}
