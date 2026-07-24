using System;
using System.Collections.Generic;
using System.Text;

namespace desktop.Data.Models
{
    public class MTemplate(string HtmlContent)
    {
        public Guid Id { get; private set; } = Guid.NewGuid();
        public string Name { get; set; } = "default name";
        public string HtmlContent { get; set; } = HtmlContent;
    }
}
