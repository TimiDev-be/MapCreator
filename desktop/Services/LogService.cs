using desktop.Classes;
using desktop.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using System.Windows;
using System.Windows.Shapes;

namespace desktop.Services
{
    public class LogService(AppDataContext appDataContext)
    {
        private readonly AppDataContext _dataContext = appDataContext;
        public async Task WriteLog(Log log)
        {
            string LogPath = System.IO.Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                "MapCreator",
                "logs",
                $"{DateTime.Now.ToString("dd.MM.yyyy")}.txt"
            );

            if (!File.Exists(LogPath))
            {
                File.Create(LogPath).Close();
                await WriteLog(log);
                return;
            }

            using (StreamWriter sw = new StreamWriter(LogPath, true))
            {
                sw.WriteLine($"[{log.Status}, {log.CreatedDate}] {log.Title}");
                sw.WriteLine($"{log.Description}");
                sw.WriteLine("LOG END");
            }

            _dataContext.LogData.Logs = [
                new LogEntry(System.IO.Path.GetFileNameWithoutExtension(LogPath), log),
                ..this._dataContext.LogData.Logs,
            ];
        }
        public static async Task<List<Log>> ReadLog(string LogPath)
        {
            if (!File.Exists(LogPath)) return new List<Log>();

            var logs = new List<Log>();
            Log? current = null;
            var descriptionLines = new List<string>();

            foreach (var line in await File.ReadAllLinesAsync(LogPath))
            {
                if (line.StartsWith("["))
                {
                    if (current != null)
                    {
                        current.Description = string.Join("\n", descriptionLines);
                        logs.Add(current);
                        descriptionLines.Clear();
                    }
                    var match = Regex.Match(line, @"\[(?<status>\w+), (?<date>[^\]]+)\] (?<title>.+)");
                    current = new Log(
                        Enum.Parse<LogStatus>(match.Groups["status"].Value),
                        match.Groups["title"].Value,
                        ""
                    )
                    {
                        CreatedDate = DateTime.Parse(match.Groups["date"].Value)
                    };
                }
                else if (line != "LOG END" && current != null)
                {
                    descriptionLines.Add(line);
                }
                else if (line == "LOG END" && current != null)
                {
                    current.Description = string.Join("\n", descriptionLines);
                    logs.Add(current);
                    descriptionLines.Clear();
                    current = null;
                }
            }

            return logs;
        }
        public void ClearLogs()
        {
            var allLogPaths = this._dataContext.LogData.Logs.Select(l => l.Key).ToList().Distinct();
            foreach (var logPath in allLogPaths) {
                string path = System.IO.Path.Combine(
                    Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                    "MapCreator",
                    "logs",
                    logPath + ".txt"
                );
                File.Delete(path);
            }
            this._dataContext.LogData.Logs.Clear();
        }
        public static async Task ClearOldLogs()
        {
            try
            {
                string path = System.IO.Path.Combine(
                    Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                    "MapCreator",
                    "logs"
                );
                if (!Directory.Exists(path)) return;

                var cutoff = DateTime.Now.AddDays(-14);

                foreach (var file in Directory.GetFiles(path, "*.txt"))
                {
                    if (File.GetLastWriteTime(file) < cutoff)
                        File.Delete(file);
                }
            }
            catch(Exception ex) {
                await new Log(LogStatus.Error, "Error while clearing old logs", ex.Message.ToString()).Save();
            }
        }
    }
}
