using desktop.Classes;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.Json;

namespace desktop.Services
{
    class ConfigService
    {
        private static readonly string ConfigFilePath = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), 
            "MapCreator", 
            "config.json"
        );

        public static AppData Load()
        {
            if (!File.Exists(ConfigFilePath))
            {
                return new AppData(null);
            }
            string json = File.ReadAllText(ConfigFilePath);
            return JsonSerializer.Deserialize<AppData>(json) ?? new AppData(null);
        }

        public static string? GetUrl()
        {
            string jsonString = File.ReadAllText(ConfigFilePath);
            var config = JsonSerializer.Deserialize<AppData>(jsonString, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
            return config?.StyleUrl;
        }
        public static void Save(AppData appData)
        {
            Directory.CreateDirectory(Path.GetDirectoryName(ConfigFilePath)!);
            File.WriteAllText(ConfigFilePath, JsonSerializer.Serialize(appData));
        }
    }
    
}
