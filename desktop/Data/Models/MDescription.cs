using System;
using System.Collections.Generic;
using System.Text;

namespace desktop.Data.Models
{
    public class MDescription
    {
        public Guid? TemplateId { get; set; } = null;
        public Dictionary<string, string> Values { get; set; } = new Dictionary<string, string>();
        public string DescriptionForMapMaker { get; set; } = string.Empty;
        public MTemplatePrintSettings TemplatePrintSettings { get; set; }
    }
}
