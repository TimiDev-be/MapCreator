using System;
using System.Collections.Generic;
using System.Text;

namespace desktop.Data.Models
{
    public class MAttractionPoint
    {
        public float[] Coords { get; set; }
        public float Zoom { get; set; }
        public float MinZoom { get; set; }
        public float MaxZoom { get; set; }
        public float Pitch { get; set; }
        public float Bearing { get; set; }

        public MAttractionPoint(float[] Coords, float Zoom, float MinZoom, float MaxZoom, float Pitch, float Bearing)
        {
            this.Coords = Coords;
            this.Zoom = Zoom;
            this.MinZoom = MinZoom;
            this.MaxZoom = MaxZoom;
            this.Pitch = Pitch;
            this.Bearing = Bearing;
        }
    }
}
