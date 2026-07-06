using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Windows.Data;

namespace desktop.Classes
{
    public class StringIsLongerConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            var text = (string)value ?? "";
            var limited = parameter is not null ? int.Parse(parameter.ToString() ?? "100") : 100;
            return text.Length > limited ? text[..limited] + "..." : text;
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}
