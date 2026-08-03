using System;
using System.Collections.Generic;
using System.Text;
using static desktop.Data.Models.MFormat;

namespace desktop.Data.Models
{
    public enum Orientation { Portrait, Landscape };
    public enum Unit { Px, Mm, Cm, In };    
    public class MTemplatePrintSettings(
        float[]? Format = null, 
        Orientation Orientation = Orientation.Portrait, 
        float[]? Margins = null, 
        Unit Unit = Unit.Px
    )
    {
        public float[] Format { get; set; } = Format ?? Formats[PageFormats.A4];
        public Orientation Orientation { get; set; } = Orientation;
        public float[] Margins { get; set; } = Margins ?? new float[4] {0, 0, 0, 0};
        public Unit Unit { get; set; } = Unit;
    }
}
