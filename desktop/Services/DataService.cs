using desktop.Classes;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.Json;
using System.Windows;

namespace desktop.Services
{
    public class DataService
    {
        private static readonly string DataFilePath = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            "MapCreator",
            "data.json"
        );

        public async Task<AppData> Load()
        {
            if (!File.Exists(DataFilePath))
            {
                Directory.CreateDirectory(Path.GetDirectoryName(DataFilePath)!);
                await File.WriteAllTextAsync(DataFilePath, JsonSerializer.Serialize(new AppData(null)));
                return new AppData(null);
            }
            string json = await File.ReadAllTextAsync(DataFilePath);

            if (string.IsNullOrWhiteSpace(json)) return new AppData(null);

            return JsonSerializer.Deserialize<AppData>(json) ?? new AppData(null);
        }
        public async Task<AppData?> GetData()
        {
            if (!File.Exists(DataFilePath)) return await Load();

            var data = await File.ReadAllTextAsync(DataFilePath);

            if (string.IsNullOrWhiteSpace(data)) return null;

            return JsonSerializer.Deserialize<AppData>(data, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
        }

        public async Task UpdateData(string dataToUpdate)
        {
            if (!File.Exists(DataFilePath)) return;
            await File.WriteAllTextAsync(DataFilePath, JsonSerializer.Serialize(new AppData(dataToUpdate)));
        }
    }
}
