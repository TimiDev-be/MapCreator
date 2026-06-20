using System;
using System.IO;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net.Http;
using System.Reflection;
using System.Text;
using System.Text.Json;
using System.Windows;

namespace desktop.Services
{
    public class UpdateService
    {
        private const string GitHubApiUrl = "https://github.com/TimiDev-be/MapCreator/releases/latest";
        private readonly string _currentVersion;

        public UpdateService()
        {
            _currentVersion = Assembly.GetExecutingAssembly()
                .GetName().Version?.ToString(3) ?? "0.0.0";
        }

        public async Task CheckForUpdatesAsync()
        {
            try
            {
                var release = await FetchLatestReleaseAsync();
                if (release == null) return;

                var latestVersion = release.TagName.TrimStart('v');

                if (IsNewerVersion(latestVersion, _currentVersion))
                {
                    var result = MessageBox.Show(
                        $"New version {latestVersion} is available. Download and install?",
                        "Update Available",
                        MessageBoxButton.YesNo,
                        MessageBoxImage.Information
                    );

                    if (result == MessageBoxResult.Yes)
                        await DownloadAndInstallAsync(release);
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Update check failed: {ex.Message}");
            }
        }

        private async Task<GitHubRelease?> FetchLatestReleaseAsync()
        {
            using var client = new HttpClient();
            client.DefaultRequestHeaders.UserAgent.ParseAdd("MapCreator");

            var response = await client.GetStringAsync(GitHubApiUrl);
            return JsonSerializer.Deserialize<GitHubRelease>(response, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
        }

        private async Task DownloadAndInstallAsync(GitHubRelease release)
        {
            var asset = release.Assets.FirstOrDefault(a => a.Name.EndsWith(".exe"));
            if (asset == null) return;

            var tempPath = Path.Combine(Path.GetTempPath(), asset.Name);

            using var client = new HttpClient();
            client.DefaultRequestHeaders.UserAgent.ParseAdd("MapCreator");

            var bytes = await client.GetByteArrayAsync(asset.BrowserDownloadUrl);
            await File.WriteAllBytesAsync(tempPath, bytes);

            Process.Start(new ProcessStartInfo(tempPath) { UseShellExecute = true });
            Application.Current.Shutdown();
        }

        private bool IsNewerVersion(string latest, string current)
        {
            return Version.TryParse(latest, out var l) &&
                   Version.TryParse(current, out var c) &&
                   l > c;
        }
    }

    public class GitHubRelease
    {
        public string TagName { get; set; } = string.Empty;
        public List<GitHubAsset> Assets { get; set; } = [];
    }

    public class GitHubAsset
    {
        public string Name { get; set; } = string.Empty;
        public string BrowserDownloadUrl { get; set; } = string.Empty;
    }
}
