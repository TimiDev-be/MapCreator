using System.Collections.Generic;

namespace desktop.Data.Models
{
    public enum PageFormats
    {
        A0, A1, A2, A3, A4, A5, A6, A7, A8, A9, A10,
        B0, B1, B2, B3, B4, B5, B6, B7, B8, B9, B10,
        C0, C1, C2, C3, C4, C5, C6, C7, C8, C9, C10,
        DL, Letter, GovernmentLetter, Legal, JuniorLegal,
        Ledger, Tabloid, CreditCard
    }

    public static class MFormat
    {
        public static readonly Dictionary<PageFormats, float[]> Formats = new()
        {
            // A series
            [PageFormats.A0] = new float[] { 2384, 3370 },
            [PageFormats.A1] = new float[] { 1684, 2384 },
            [PageFormats.A2] = new float[] { 1191, 1684 },
            [PageFormats.A3] = new float[] { 842, 1191 },
            [PageFormats.A4] = new float[] { 595, 842 },
            [PageFormats.A5] = new float[] { 420, 595 },
            [PageFormats.A6] = new float[] { 298, 420 },
            [PageFormats.A7] = new float[] { 210, 298 },
            [PageFormats.A8] = new float[] { 147, 210 },
            [PageFormats.A9] = new float[] { 105, 147 },
            [PageFormats.A10] = new float[] { 74, 105 },

            // B series
            [PageFormats.B0] = new float[] { 2835, 4008 },
            [PageFormats.B1] = new float[] { 2004, 2835 },
            [PageFormats.B2] = new float[] { 1417, 2004 },
            [PageFormats.B3] = new float[] { 1001, 1417 },
            [PageFormats.B4] = new float[] { 709, 1001 },
            [PageFormats.B5] = new float[] { 499, 709 },
            [PageFormats.B6] = new float[] { 354, 499 },
            [PageFormats.B7] = new float[] { 249, 354 },
            [PageFormats.B8] = new float[] { 176, 249 },
            [PageFormats.B9] = new float[] { 125, 176 },
            [PageFormats.B10] = new float[] { 88, 125 },

            // C series
            [PageFormats.C0] = new float[] { 2599, 3677 },
            [PageFormats.C1] = new float[] { 1837, 2599 },
            [PageFormats.C2] = new float[] { 1298, 1837 },
            [PageFormats.C3] = new float[] { 918, 1298 },
            [PageFormats.C4] = new float[] { 649, 918 },
            [PageFormats.C5] = new float[] { 459, 649 },
            [PageFormats.C6] = new float[] { 323, 459 },
            [PageFormats.C7] = new float[] { 230, 323 },
            [PageFormats.C8] = new float[] { 162, 230 },
            [PageFormats.C9] = new float[] { 113, 162 },
            [PageFormats.C10] = new float[] { 79, 113 },
            [PageFormats.DL] = new float[] { 312, 624 },

            // US formats
            [PageFormats.Letter] = new float[] { 612, 792 },
            [PageFormats.GovernmentLetter] = new float[] { 576, 756 },
            [PageFormats.Legal] = new float[] { 612, 1008 },
            [PageFormats.JuniorLegal] = new float[] { 576, 360 },
            [PageFormats.Ledger] = new float[] { 1224, 792 },
            [PageFormats.Tabloid] = new float[] { 792, 1224 },
            [PageFormats.CreditCard] = new float[] { 153, 243 },
        };
    }
}