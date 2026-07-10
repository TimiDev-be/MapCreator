using desktop.Classes;
using desktop.Data;
using desktop.Services;
using System.Configuration;
using System.Data;
using System.Windows;

namespace desktop
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        public static AppDataContext AppDataContext { get; private set; }
        public static StyleService StyleService { get; private set; }
        public static DataService DataService { get; private set; }
        public static LogService LogService { get; private set; }
        public LocalHttp _server { get; set; }
        protected override async void OnStartup(StartupEventArgs e)
        {
            base.OnStartup(e);
            await new UpdateService().CheckForUpdatesAsync();

            AppDataContext = new AppDataContext();
            await AppDataContext.LoadStyleDataAsync();
            await AppDataContext.LoadAppDataAsync();
            await AppDataContext.LoadLogDataAsync();

            StyleService = new StyleService(AppDataContext);
            DataService = new DataService(AppDataContext);
            LogService = new LogService(AppDataContext);

            _server = new LocalHttp(AppDataContext);
            await _server.Start();

            MainWindow mainWindow = new MainWindow();
            mainWindow.Show();
        }
        protected override void OnExit(ExitEventArgs e)
        {
            _server.Stop();
            base.OnExit(e);
        }
    }

}
