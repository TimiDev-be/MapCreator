using System;
using System.Collections.Generic;
using System.Text;

namespace desktop.Data.Models
{
    public class MGroup
    {
        public Guid Id { get; private set; } = Guid.NewGuid();
        public string Name { get; set; }

        public MGroup(string Name)
        {
            this.Name = Name;
        }
    }
}
