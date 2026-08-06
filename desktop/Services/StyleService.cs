using desktop.Classes;
using desktop.Data;
using desktop.WebSockets;
using desktop.WebSockets.Messages;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;

namespace desktop.Services
{
    public class StyleService(AppDataContext dataContext, IWsStyleManager wsStyleManager)
    {
        private static readonly string ConfigFilePath = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            "MapCreator",
            "styles.json"
        );
        private readonly AppDataContext _dataContext = dataContext;
        private readonly IWsStyleManager _wsStyleManager = wsStyleManager;
        public Style? GetStyle(Guid id)
        {
            return _dataContext.StyleData.Styles.FirstOrDefault(s => s.Id == id);
        }

        public Style? GetActiveStyle()
        {
            return _dataContext.StyleData.Styles.FirstOrDefault(s => s.IsActive);
        }

        public async Task<bool> ToggleActiveStyle(Guid id)
        {
            var styleToActivate = _dataContext.StyleData.Styles.FirstOrDefault(s => s.Id == id);
            
            if (styleToActivate is not null && styleToActivate.IsActive)
            {
                return false;
            }
            else if (styleToActivate != null)
            {
                _dataContext.StyleData.Styles.FirstOrDefault(s => s.IsActive)?.IsActive = false;
                styleToActivate.IsActive = true;
            }

            await Save();
            await this.SendWsInformation();

            return true;
        }

        public async Task<List<Style>> GetStyles()
        {
            var styles = _dataContext.StyleData.Styles;
            if (styles.FirstOrDefault(styles => styles.IsActive) is null && styles.Count > 0)
            {
                styles[0].IsActive = true;
                await Save();
            }
            return _dataContext.StyleData.Styles.ToList();
        }

        public async Task AddStyle(Style style)
        {
            var styles = await this.GetStyles();

            if (styles.Count == 0)
            {
                style.IsActive = true;
            }

            _dataContext.StyleData.Styles.Add(style);
            await Save();

            if (style.IsActive)
                await this.SendWsInformation();
        }

        public async Task UpdateStyle(Style style)
        {
            var existingStyle = _dataContext.StyleData.Styles.FirstOrDefault(s => s.Id == style.Id);
            if (existingStyle != null)
            {
                existingStyle.Name = style.Name;
                existingStyle.Url = style.Url;
                await Save();
                if (existingStyle.IsActive)
                    await this.SendWsInformation();
            }
        }

        public async Task DeleteStyle(Guid id)
        {
            var item = _dataContext.StyleData.Styles.FirstOrDefault(s => s.Id == id);
            if (item is null) return;

            var styles = await this.GetStyles();
            if (item.IsActive && styles.Count > 1)
            {
                styles.First(s => s.Id != id).IsActive = true;
            }
            _dataContext.StyleData.Styles.Remove(item);
            
            await Save();
            await this.SendWsInformation();
        }

        public async Task Save()
        {
            Directory.CreateDirectory(Path.GetDirectoryName(ConfigFilePath)!);
            await File.WriteAllTextAsync(ConfigFilePath, JsonSerializer.Serialize(_dataContext.StyleData));
        }

        private async Task SendWsInformation()
        {
            var webSockets = _wsStyleManager.GetWebSockets();
            foreach (var webSocket in webSockets)
            {
                var activeStyle = GetActiveStyle();
                ActiveStyleWsMessage message = new ActiveStyleWsMessage(activeStyle);
                var activeStyleJson = JsonSerializer.Serialize(message, _dataContext.AppJsonSerializerOptions);
                await webSocket.SendAsync(
                    Encoding.UTF8.GetBytes(activeStyleJson),
                    WebSocketMessageType.Text,
                    true,
                    CancellationToken.None
                );
            }
        }
    }
    
}
