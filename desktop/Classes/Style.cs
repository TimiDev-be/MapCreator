using System;
using System.Collections.Generic;
using System.Text;

namespace desktop.Classes
{
    public class Style(string Name, string Url)
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; } = Name;
        public string Url { get; set; } = Url;
        public bool IsActive { get; set; } = false;
    }
}
