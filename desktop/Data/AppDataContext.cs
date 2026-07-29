using desktop.Classes;
using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Text.Json;
using desktop.Services;
using System.Collections.ObjectModel;
using desktop.Data.Models;

namespace desktop.Data
{
    public class AppDataContext
    {
        private static readonly string ConfigStyleFilePath = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            "MapCreator",
            "styles.json"
        );
        private static readonly string ConfigAppDataFilePath = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            "MapCreator",
            "data.json"
        );
        private static readonly string ConfigLogFolderPath = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            "MapCreator",
            "logs"
        );
        public JsonSerializerOptions AppJsonSerializerOptions = new JsonSerializerOptions()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        };
        public StyleData StyleData { get; set; } = new StyleData();
        public AppData AppData { get; set; } = new AppData();
        public LogData LogData { get; set; } = new LogData();

        public async Task LoadStyleDataAsync()
        {
            if (!File.Exists(ConfigStyleFilePath))
            {
                StyleData styleData = new StyleData(new List<Style>());
                Directory.CreateDirectory(Path.GetDirectoryName(ConfigStyleFilePath)!);
                await File.WriteAllTextAsync(ConfigStyleFilePath, JsonSerializer.Serialize(styleData));

                this.StyleData = styleData;
                return;
            }

            var json = await File.ReadAllTextAsync(ConfigStyleFilePath);
            this.StyleData = JsonSerializer.Deserialize<StyleData>(json) ?? new StyleData(new List<Style>());
        }

        public async Task LoadAppDataAsync()
        {
            if (!File.Exists(ConfigAppDataFilePath))
            {
                AppData appData = new AppData();
                Directory.CreateDirectory(Path.GetDirectoryName(ConfigAppDataFilePath)!);
                var jsonToWrite = JsonSerializer.Serialize(appData.Source, AppJsonSerializerOptions);
                await File.WriteAllTextAsync(ConfigAppDataFilePath, jsonToWrite);

                this.AppData = appData;
                return;
            }

            var json = await File.ReadAllTextAsync(ConfigAppDataFilePath);
            this.AppData.Source = JsonSerializer.Deserialize<MSource>(json, AppJsonSerializerOptions) ?? new MSource();
        }

        public async Task LoadLogDataAsync()
        {
            if (!Directory.Exists(ConfigLogFolderPath))
            {
                Directory.CreateDirectory(ConfigLogFolderPath);
            }

            var files = Directory.GetFiles(ConfigLogFolderPath, "*.txt")
                .OrderByDescending(f => File.GetLastWriteTime(f))
                .ToList();

            foreach (var file in files)
            {
                List<Log> logs = await LogService.ReadLog(file);
                foreach (var log in logs)
                {
                    this.LogData.Logs.Add(new LogEntry(Path.GetFileNameWithoutExtension(file), log));
                }
            }

            this.LogData.Logs = new ObservableCollection<LogEntry>(
                this.LogData.Logs.OrderByDescending(l => l.Data.CreatedDate).ToList()
            );
        }
    }
}
