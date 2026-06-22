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
using desktop.Classes;
using desktop.Controls;
using desktop.Services;

namespace desktop
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            WelcomePage.GetStartedClicked += async (s, e) =>
            {
                WelcomePage.Visibility = Visibility.Collapsed;

                UrlService urlService = new UrlService();
                DataService dataService = new DataService();
                UrlData style =  await urlService.Load();
                await dataService.Load();

                if (string.IsNullOrEmpty(style.StyleUrl))
                {
                    SetupUrlPage.Visibility = Visibility.Visible;
                }
                else
                {
                    WebViewAppPage.Visibility = Visibility.Visible;
                }
            };

            SetupUrlPage.CloseSetupUrlClicked += (s, e) => {
                WelcomePage.Visibility = Visibility.Visible;
                SetupUrlPage.Visibility = Visibility.Collapsed;
            };

            WebViewAppPage.ChangeStyleUrlClicked += (s, e) =>
            {
                WebViewAppPage.Visibility = Visibility.Collapsed;
                ChangeUrlPage.Visibility = Visibility.Visible;
            };

            ChangeUrlPage.CloseChangeUrlClicked += (s, e) =>
            {
                ChangeUrlPage.Visibility = Visibility.Collapsed;
                WebViewAppPage.Visibility = Visibility.Visible;
            };
        }
    }
}