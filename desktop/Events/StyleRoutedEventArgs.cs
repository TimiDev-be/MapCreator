using System;
using System.Collections.Generic;
using System.Text;
using System.Windows;

namespace desktop.Events
{
    public class StyleRoutedEventArgs : RoutedEventArgs
    {
        public desktop.Classes.Style Style { get; private set; }
        public StyleRoutedEventArgs(RoutedEvent routedEvent, desktop.Classes.Style style) : base(routedEvent)
        {
            Style = style;
        }
    }
}
