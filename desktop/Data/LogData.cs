using desktop.Classes;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;

namespace desktop.Data
{
    public class LogData
    {
        public ObservableCollection<LogEntry> Logs { get; set; } = [];
        public LogData()
        {
            
        }
        public LogData(List<LogEntry> Logs)
        {
            this.Logs = new ObservableCollection<LogEntry>([..Logs]);
        }
    }
}
