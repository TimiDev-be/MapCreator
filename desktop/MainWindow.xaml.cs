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
using desktop.Data;
using desktop.Controls.Workspace;
using desktop.Events;

namespace desktop
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public Control? CurrentPage { get; set; } = null;
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
                SetCurrentPage(this.WebViewAppPage);
            }

            this.AddHandler(AppEvents.OpenAddStylePopupEvent, new RoutedEventHandler(SetupStylePopup_Open));
            this.AddHandler(AppEvents.OpenChangeStylePopupEvent, new EventHandler<StyleRoutedEventArgs>((s, e) =>
            {
                ChangeStylePopup.OldStyle = e.Style;
                this.ChangeStylePopup.Visibility = Visibility.Visible;
            }));
            this.AddHandler(AppEvents.ReloadWebViewEvent, new RoutedEventHandler(OnReloadWebView));

            Header.PageChangeInvoked += async (s, e) =>
            {
                if (this.CurrentPage is null) 
                {
                    await new Log(LogStatus.Warning, "Current page is null", "").Save();
                    return;
                }
                if (this.CurrentPage == this.WorkspacePage)
                {
                    SetCurrentPage(this.WebViewAppPage);
                    this.Header.ToggleButtons(this.WebViewAppPage.Name);
                }
                else if (this.CurrentPage == this.WebViewAppPage)
                {
                    SetCurrentPage(this.WorkspacePage);
                    this.Header.ToggleButtons(this.WorkspacePage.Name);
                }
            };


            WelcomePage.GetStartedClicked += async (s, e) =>
            {
                WelcomePage.Visibility = Visibility.Collapsed;
                SetCurrentPage(this.WebViewAppPage);
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
                        await new Log(LogStatus.Error, "Error while creating webview directory", ex.Message).Save();
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
                await new Log(LogStatus.Error, "Error while loading webview", ex.Message).Save();
            }
        }
        private void SetCurrentPage(Control page)
        {
            if (CurrentPage != null)
            {
                CurrentPage.Visibility = Visibility.Collapsed;
            }
            CurrentPage = page;
            CurrentPage.Visibility = Visibility.Visible;
        }
        private void SetupStylePopup_Open(object sender, RoutedEventArgs e)
        {
            this.SetupStylePopup.Visibility = Visibility.Visible;
        }
        private void OnReloadWebView(object sender, RoutedEventArgs e)
        {
            this.WebViewAppPage.WebView.Reload();
        }
    }
}