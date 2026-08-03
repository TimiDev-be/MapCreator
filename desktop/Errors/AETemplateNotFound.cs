using System;
using System.Collections.Generic;
using System.Text;

namespace desktop.Errors
{
    public class AETemplateNotFound : AppError
    {
        public AETemplateNotFound() : base("Specified template not found.")
        {
            this.StatusCode = 403;
        }
    }
}
