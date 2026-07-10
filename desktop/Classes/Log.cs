using System;
using System.Collections.Generic;
using System.Text;

namespace desktop.Classes
{
    public enum LogStatus { Info, Warning, Error }
    public class Log(LogStatus status, string title, string description)
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public LogStatus Status { get; set; } = status;
        public string Title { get; set; } = title;
        public string Description { get; set; } = description;
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public async Task Save()
        {
           await App.LogService.WriteLog(this);
        }
    }
}
