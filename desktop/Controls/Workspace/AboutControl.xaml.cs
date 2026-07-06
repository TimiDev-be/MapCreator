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

namespace desktop.Controls.Workspace
{
    /// <summary>
    /// Interaction logic for AboutControl.xaml
    /// </summary>
    public partial class AboutControl : UserControl
    {
        public AboutControl()
        {
            InitializeComponent();
            this.AppNameTextBlock.Text = App.ResourceAssembly.GetName().Name;
            this.VersionTextBlock.Text = $"Version {App.ResourceAssembly.GetName().Version}";
        }
    }
}
