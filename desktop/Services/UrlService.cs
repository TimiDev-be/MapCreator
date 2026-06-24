using desktop.Classes;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.Json;

namespace desktop.Services
{
    class UrlService
    {
        private static readonly string ConfigFilePath = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), 
            "MapCreator", 
            "styles.json"
        );

        public async Task<UrlData> Load()
        { 
            if (!File.Exists(ConfigFilePath))
            {
                Directory.CreateDirectory(Path.GetDirectoryName(ConfigFilePath)!);
                await File.WriteAllTextAsync(ConfigFilePath, JsonSerializer.Serialize(new UrlData(null)));
                return new UrlData(null);
            }
            string json = File.ReadAllText(ConfigFilePath);
            return JsonSerializer.Deserialize<UrlData>(json) ?? new UrlData(null);
        }

        public async Task<UrlData?> GetUrl()
        {
            if (!File.Exists(ConfigFilePath)) return await Load();
            var url = await File.ReadAllTextAsync(ConfigFilePath);
            var config = JsonSerializer.Deserialize<UrlData>(url, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
            return config;
        }
        public async Task Save(UrlData urlData)
        {
            Directory.CreateDirectory(Path.GetDirectoryName(ConfigFilePath)!);
            await File.WriteAllTextAsync(ConfigFilePath, JsonSerializer.Serialize(urlData));
        }
    }
    
}
