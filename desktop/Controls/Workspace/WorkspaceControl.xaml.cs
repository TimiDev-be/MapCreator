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
    /// Interaction logic for WorkspaceControl.xaml
    /// </summary>
    public partial class WorkspaceControl : UserControl
    {
        public WorkspaceControl()
        {
            InitializeComponent();
            this.Navigation.OnNavigate = (panelName) =>
            {
                switch (panelName) {
                    case "styles":
                        this.ScrollToSection(this.StylesPanel); 
                        break;
                    case "logs":
                        this.ScrollToSection(this.LogsPanel);
                        break;
                    case "about":
                        this.ScrollToSection(this.AboutPanel);
                        break;
                    default:
                        this.ScrollToSection(this.StylesPanel);
                        break;
                }
            };
        }

        private void ScrollToSection(UIElement element)
        {
            var transform = element.TransformToAncestor(this.WorkspaceScrollViewer);
            var position = transform.Transform(new Point(0, 0));
            this.WorkspaceScrollViewer.ScrollToVerticalOffset(position.Y);
        }
    }
}
