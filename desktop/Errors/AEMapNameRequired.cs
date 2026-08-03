using System;
using System.Collections.Generic;
using System.Text;

namespace desktop.Errors
{
    public class AEMapNameRequired : AppError
    {
        public AEMapNameRequired() : base("Map name is required.")
        {
            
        }
    }
}
