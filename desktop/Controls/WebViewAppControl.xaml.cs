using Microsoft.AspNetCore.Builder;
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
    /// Logika interakcji dla klasy WebViewAppControl.xaml
    /// </summary>
    public partial class WebViewAppControl : UserControl
    {
        public EventHandler? ChangeStyleUrlClicked;
        public WebViewAppControl()
        {
            InitializeComponent();
        }
        private void ChangeStyleUrlButton_Click(object sender, RoutedEventArgs e) {
            ChangeStyleUrlClicked?.Invoke( this, new EventArgs() );
        }
    }
}
