using System;
using System.Collections.Generic;
using System.Text;
using static desktop.Data.Models.MTemplatePrintSettings;

namespace desktop.Data.Models
{
    public enum DPI
    {
        D72 = 72,
        D96 = 96,
        D100 = 100,
        D200 = 200,
        D300 = 300,
        D400 = 400,
        D500 = 500,
        D600 = 600,
        D700 = 700,
        D800 = 800,
        D900 = 900,
        D1000 = 1000,
    };
    public class MMapPrintSettings
    {
        public DPI DPI { get; set; } = DPI.D96;
        public Unit Unit { get; set; } = Unit.Mm;
        public float Scale { get; set; } = 1.7F;
    }
}
