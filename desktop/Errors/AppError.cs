using System;
using System.Collections.Generic;
using System.Text;

namespace desktop.Errors
{
    public class AppError : Exception
    {
        public string Title { get; set; } = "Something went wrong";
        public string Description { get; set; } = string.Empty;
        public int StatusCode { get; set; } = 400;

        public AppError(string description) : base(description)
        {
            this.Description = description;
        }
    }
}
