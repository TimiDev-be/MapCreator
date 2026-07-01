using System;
using System.Collections.Generic;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace desktop.Controls
{
    /// <summary>
    /// Interaction logic for HeaderControl.xaml
    /// </summary>
    public partial class HeaderControl : UserControl
    {
        public EventHandler? PageChangeInvoked;
        public HeaderControl()
        {
            InitializeComponent();
        }

        // Page names: "WorkspacePage", "WebViewAppPage"
        public void ToggleButtons(string pageName)
        {
            switch (pageName) {
                case "WorkspacePage":
                    this.BackToMapsButton.Visibility = Visibility.Visible;
                    this.BackToWorkspaceButton.Visibility = Visibility.Collapsed;
                    this.PageName.Text = "workspace";
                    break;
                case "WebViewAppPage":
                    this.BackToMapsButton.Visibility = Visibility.Collapsed;
                    this.BackToWorkspaceButton.Visibility = Visibility.Visible;
                    this.PageName.Text = "maps";
                    break;
                default:
                    throw new Exception($"Unknown page name: {pageName}");
            }
        }

        private void ChangePage(object sender, RoutedEventArgs e)
        {
            PageChangeInvoked?.Invoke(sender, EventArgs.Empty);
        }
    }
}
