using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace desktop.Data.Models
{
    public class MGroup
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; }
        public MGroup()
        {
            
        }
        public MGroup(string Name)
        {
            this.Name = Name;
        }
        [JsonConstructor]
        public MGroup(Guid Id, string Name)
        {
            this.Id = Id;
            this.Name = Name;
        }
    }
}
