using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Net.WebSockets;
using System.Text;

namespace desktop.WebSockets
{
    public interface IWsStyleManager
    {
        public string AddStyleSocket(string userId, WebSocket socket);
        public void RemoveStyleSocket(string userId);
        public IEnumerable<WebSocket> GetWebSockets();
    }
    public class WsStyleManager : IWsStyleManager
    {
        private readonly ConcurrentDictionary<string, WebSocket> StylesSockets = new();
        public string AddStyleSocket(string userId, WebSocket socket)
        {
            StylesSockets.TryAdd(userId, socket);
            return userId;
        }
        public void RemoveStyleSocket(string userId)
        {
            StylesSockets.TryRemove(userId, out _);
            return;
        }
        public IEnumerable<WebSocket> GetWebSockets() { return StylesSockets.Values; }
    }
}
