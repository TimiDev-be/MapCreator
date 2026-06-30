using desktop.Classes;
using desktop.Controls;
using desktop.Services;
using Microsoft.Web.WebView2.Core;
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
using System.IO;

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

            string isFirstLaunchedFilePath = System.IO.Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "MapCreator", "firstLaunch.txt");
            if (!File.Exists(isFirstLaunchedFilePath))
            {
                File.Create(isFirstLaunchedFilePath);
            }
            else
            {
                WelcomePage.Visibility = Visibility.Collapsed;
                WebViewAppPage.Visibility = Visibility.Visible;
            }

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

            SetupUrlPage.CloseSetupUrlClicked += (s, e) => 
            {
                WelcomePage.Visibility = Visibility.Visible;
                SetupUrlPage.Visibility = Visibility.Collapsed;
            };
            SetupUrlPage.SaveSetupUrlClicked += (s, e) =>
            {
                SetupUrlPage.Visibility = Visibility.Collapsed;
                WebViewAppPage.Visibility = Visibility.Visible;
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

            ChangeUrlPage.SaveChangeUrlClicked += (s, e) => 
            { 
                WebViewAppPage.WebView.Reload();
            };
        }
        private async void MainWindow_ContentRendered(object sender, EventArgs e)
        {
            try
            {
                string userDataFolder = System.IO.Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "MapCreator", "WebView2Data");
                if (!Directory.Exists(userDataFolder))
                {
                    try
                    {
                        Directory.CreateDirectory(userDataFolder);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("Something went wrong while creating directory " + ex.Message);
                        return;
                    }
                }

                var env = await CoreWebView2Environment.CreateAsync(null, userDataFolder);
                await this.WebViewAppPage.WebView.EnsureCoreWebView2Async(env);

                dynamic app = Application.Current;
                await app._server.HttpReady.Task;

                string url = $"http://localhost:{app._server.Port}";
                await this.WebViewAppPage.WebView.EnsureCoreWebView2Async();
                this.WebViewAppPage.WebView.CoreWebView2.Navigate(url);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Something went wrong while loading a webview: " + ex.ToString());
            }
        }
    }
}