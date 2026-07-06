using desktop.Controls.Workspace;
using System;
using System.Collections.Generic;
using System.Text;
using System.Windows;

namespace desktop.Events
{
    public static class AppEvents
    {
        public static readonly RoutedEvent ReloadWebViewEvent = EventManager.RegisterRoutedEvent(
            "ReloadWebView", RoutingStrategy.Bubble, typeof(RoutedEventHandler), typeof(StylesControl)
        );
        public static readonly RoutedEvent OpenAddStylePopupEvent = EventManager.RegisterRoutedEvent(
            "OpenAddStylePopup", RoutingStrategy.Bubble, typeof(RoutedEventHandler), typeof(StylesControl)
        );
        public static readonly RoutedEvent OpenChangeStylePopupEvent = EventManager.RegisterRoutedEvent(
            "OpenChangeStylePopup", RoutingStrategy.Bubble, typeof(EventHandler<StyleRoutedEventArgs>), typeof(StylesControl)
        );
    }
}
