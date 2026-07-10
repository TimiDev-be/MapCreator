using System;
using System.Collections.Generic;
using System.Text;

namespace desktop.Classes
{
    public class LogEntry(string Key, Log Data)
    {
        public string Key { get; set; } = Key;
        public Log Data { get; set; } = Data;
    }
}
