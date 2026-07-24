using System;
using System.Collections.Generic;
using System.Text;

namespace desktop.Data.Models
{
    public class MSource
    {
        public string Id { get; private set; } = "source-of-user-data";
        public List<MMap> Maps { get; set; } = new List<MMap>();
        public List<MTemplate> Templates { get; set; } = new List<MTemplate>();

        public MSource()
        {
            
        }
    }
}
