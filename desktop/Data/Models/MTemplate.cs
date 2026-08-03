using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace desktop.Data.Models
{
    public class MTemplate
    {
        [JsonInclude]
        public Guid Id { get; private set; } = Guid.NewGuid();
        public string Name { get; set; } = "default name";
        public string HtmlContent { get; set; } = string.Empty;

        public MTemplate(string htmlContent)
        {
            this.HtmlContent = htmlContent;
        }
        [JsonConstructor]
        public MTemplate(Guid id, string name, string htmlContent)
        {
            this.Id = id;
            this.Name = name;
            this.HtmlContent = htmlContent;
        }
    }
}
