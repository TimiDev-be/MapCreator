using System.Configuration;
using System.Data;
using System.Windows;
using desktop.Services;

namespace desktop
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        public LocalHttp _server { get; } = new LocalHttp();
        protected override async void OnStartup(StartupEventArgs e)
        {
            base.OnStartup(e);
            await new UpdateService().CheckForUpdatesAsync();
            await _server.Start();
        }
        protected override void OnExit(ExitEventArgs e)
        {
            _server.Stop();
            base.OnExit(e);
        }
    }

}
