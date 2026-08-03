using System;
using System.Collections.Generic;
using System.Text;

namespace desktop.Errors
{
    public class AEMapNotFound : AppError
    {
        public AEMapNotFound() : base("Specified map not found.")
        {
            this.StatusCode = 403;
        }
    }
}
