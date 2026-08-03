using System;
using System.Collections.Generic;
using System.Text;

namespace desktop.Data.Models
{
    public class MAreaForPrint
    {
        public float Width { get; set; } 
        public float Height { get; set; } 

        public MAreaForPrint(float Width = 150, float Height = 95)
        {
            this.Width = Width;
            this.Height = Height;
        }
    }
}
