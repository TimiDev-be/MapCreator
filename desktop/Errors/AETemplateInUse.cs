using System;
using System.Collections.Generic;
using System.Text;

namespace desktop.Errors
{
    public class AETemplateInUse : AppError
    {
        public AETemplateInUse() : base("The template is currently in use and cannot be deleted.")
        {
        }
    }
}
