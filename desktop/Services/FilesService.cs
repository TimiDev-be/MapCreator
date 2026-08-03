using desktop.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text;

namespace desktop.Services
{
    public class FilesService
    {
        private static readonly string DataFilePath = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            "MapCreator",
            "data.json"
        );

        public async Task<Byte[]> DownloadDataFile()
        {
            if (!File.Exists(DataFilePath))
            {
                throw new FileNotFoundException("Data file not found");
            }

            var fileName = $"MapCreator_data_{DateTime.Now:yyyyMMddHHmmss}.json";
            var bytes = await File.ReadAllBytesAsync(DataFilePath);
            return bytes;
        }
    }
}
