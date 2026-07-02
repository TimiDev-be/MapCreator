using desktop.Classes;
using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Text.Json;

namespace desktop.Data
{
    public class AppDataContext
    {
        private static readonly string ConfigStyleFilePath = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            "MapCreator",
            "styles.json"
        );
        private static readonly string ConfigAppDataFileName = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            "MapCreator",
            "data.json"
        );
        public StyleData StyleData { get; set; }
        public AppData AppData { get; set; }

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
            if (!File.Exists(ConfigAppDataFileName))
            {
                AppData appData = new AppData(null);
                Directory.CreateDirectory(Path.GetDirectoryName(ConfigAppDataFileName)!);
                await File.WriteAllTextAsync(ConfigAppDataFileName, JsonSerializer.Serialize(appData));

                this.AppData = appData;
                return;
            }

            var json = await File.ReadAllTextAsync(ConfigAppDataFileName);
            this.AppData = JsonSerializer.Deserialize<AppData>(json) ?? new AppData(null);
        }
    }
}
