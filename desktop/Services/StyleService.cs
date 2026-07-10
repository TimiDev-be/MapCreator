using desktop.Classes;
using desktop.Data;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Text.Json;

namespace desktop.Services
{
    public class StyleService(AppDataContext dataContext)
    {
        private static readonly string ConfigFilePath = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            "MapCreator",
            "styles.json"
        );
        private readonly AppDataContext _dataContext = dataContext;

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
            if (styleToActivate is not null && styleToActivate.IsActive) return false;
            else if (styleToActivate != null)
            {
                _dataContext.StyleData.Styles.FirstOrDefault(s => s.IsActive)?.IsActive = false;
                styleToActivate.IsActive = true;
            }
            await Save();
            return true;
        }

        public List<Style> GetStyles()
        {
            return _dataContext.StyleData.Styles.ToList();
        }

        public async Task AddStyle(Style style)
        {
            _dataContext.StyleData.Styles.Add(style);
            await Save();
        }

        public async Task UpdateStyle(Style style)
        {
            var existingStyle = _dataContext.StyleData.Styles.FirstOrDefault(s => s.Id == style.Id);
            if (existingStyle != null)
            {
                existingStyle.Name = style.Name;
                existingStyle.Url = style.Url;
                await Save();
            }
        }

        public async Task DeleteStyle(Guid id)
        {
            var item = _dataContext.StyleData.Styles.FirstOrDefault(s => s.Id == id);
            if (item is null) return;
            _dataContext.StyleData.Styles.Remove(item);
            await Save();
        }

        public async Task Save()
        {
            Directory.CreateDirectory(Path.GetDirectoryName(ConfigFilePath)!);
            await File.WriteAllTextAsync(ConfigFilePath, JsonSerializer.Serialize(_dataContext.StyleData));
        }
    }
    
}
