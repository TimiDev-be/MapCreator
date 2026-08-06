using desktop.Services;
using desktop.WebSockets.Messages;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;

namespace desktop.WebSockets
{
    public static class WsEndpoints
    {
        public static JsonSerializerOptions AppJsonSerializerOptions { get; } = new JsonSerializerOptions()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        };
        public static void UseWsEndpoints(this IEndpointRouteBuilder app)
        {
            app.Map("/styles", async (context) =>
            {
                if (!context.WebSockets.IsWebSocketRequest)
                {
                    context.Response.StatusCode = 400;
                    return;
                }

                var userId = context.Request.Query["userId"].ToString();
                if (string.IsNullOrWhiteSpace(userId))
                {
                    context.Response.StatusCode = 400;
                    return;
                }

                WebSocket webSocket = await context.WebSockets.AcceptWebSocketAsync();
                var wsManager = context.RequestServices.GetRequiredService<IWsStyleManager>();

                wsManager.AddStyleSocket(userId, webSocket);

                var styleService = context.RequestServices.GetService<StyleService>();
                if (styleService is not null)
                {
                    var activeStyle = styleService.GetActiveStyle();
                    ActiveStyleWsMessage message = new ActiveStyleWsMessage(activeStyle);
                    var activeStyleJson = JsonSerializer.Serialize(message, AppJsonSerializerOptions);

                    await webSocket.SendAsync(
                        Encoding.UTF8.GetBytes(activeStyleJson),
                        WebSocketMessageType.Text,
                        true,
                        CancellationToken.None
                    );
                }

                await WsStylesEcho.HandleStylesStream(webSocket, wsManager, userId);
            });
        }
    }
}
