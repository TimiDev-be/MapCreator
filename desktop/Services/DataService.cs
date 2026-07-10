using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.Json;
using System.Windows;
using desktop.Data;

namespace desktop.Services
{
    public class DataService(AppDataContext dataContext)
    {
        private static readonly string DataFilePath = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            "MapCreator",
            "data.json"
        );
        private readonly AppDataContext _dataContext = dataContext;

        public async Task<AppData> GetData()
        {
            return _dataContext.AppData;
        }

        public async Task UpdateData(string dataToUpdate)
        {
            if (!File.Exists(DataFilePath)) return;
            _dataContext.AppData.Data = dataToUpdate;
            await File.WriteAllTextAsync(DataFilePath, JsonSerializer.Serialize(new AppData(dataToUpdate)));
        }
    }
}
