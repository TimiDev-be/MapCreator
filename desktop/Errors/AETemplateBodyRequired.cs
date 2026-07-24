using System;
using System.Collections.Generic;
using System.Text;

namespace desktop.Errors
{
    public class AETemplateBodyRequired : AppError
    {
        public AETemplateBodyRequired() : base("Template body is required.")
        {
            
        }
    }
}
