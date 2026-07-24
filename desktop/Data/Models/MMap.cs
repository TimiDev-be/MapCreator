using System;
using System.Collections.Generic;
using System.Text;

namespace desktop.Data.Models
{
    public class MMap
    {
        public Guid Id { get; private set; } = Guid.NewGuid();
        public string Name { get; set; }
        public List<MGroup> Groups { get; set; } = new List<MGroup>();
        public List<object> Features { get; set; } = new List<object>();
        public MDescription Description { get; set; } = new MDescription();
        public MAttractionPoint? AttractionPoint { get; set; } = null;
        public MAreaForPrint AreaForPrint { get; set; } = new MAreaForPrint(150, 95);
        public MMapPrintSettings PrintSettings { get; set; } = new MMapPrintSettings();
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public MMap()
        {
            
        }
        public MMap(string Name) {
            this.Name = Name;
        }

        public MMap(
            Guid Id,
            string Name, 
            MDescription Description,
            MAttractionPoint AttractionPoint,
            MAreaForPrint AreaForPrint,
            MMapPrintSettings PrintSettings,
            DateTime CreatedAt,
            DateTime UpdatedAt,
            List<MGroup>? Groups = null,
            List<object>? Features = null
        )
        {
            this.Id = Id;
            this.Name = Name;
            this.Description = Description;
            this.AttractionPoint = AttractionPoint;
            this.AreaForPrint = AreaForPrint;
            this.PrintSettings = PrintSettings;
            this.CreatedAt = CreatedAt;
            this.UpdatedAt = UpdatedAt;
            this.Groups = Groups ?? new List<MGroup>();
            this.Features = Features ?? new List<object>();
        }
    }
}
