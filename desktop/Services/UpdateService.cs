using System;
using System.Linq;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Net.Http;
using System.Reflection;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Windows;

namespace desktop.Services
{
    public class UpdateService
    {
        private const string GitHubApiUrl = "https://api.github.com/repos/TimiDev-be/MapCreator/releases/latest";
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
            client.DefaultRequestHeaders.Accept.ParseAdd("application/vnd.github+json");
            client.DefaultRequestHeaders.UserAgent.ParseAdd("MapCreator");

            var response = await client.GetStringAsync(GitHubApiUrl);
            return JsonSerializer.Deserialize<GitHubRelease>(response);
        }

        private async Task DownloadAndInstallAsync(GitHubRelease release)
        {
            var arch = Environment.Is64BitOperatingSystem ? "x64" : "x86";
            var asset = release.Assets.FirstOrDefault(a =>
                a.Name.EndsWith(".exe") && a.Name.Contains(arch, StringComparison.OrdinalIgnoreCase));
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
            var formatedLatestVersion = latest.TrimStart('v').Split('-')[0];
            var formatedCurrentVersion = current.TrimStart('v').Split('-')[0];

            return Version.TryParse(formatedLatestVersion, out var l) &&
                   Version.TryParse(formatedCurrentVersion, out var c) &&
                   l > c;
        }
    }

    public class GitHubRelease
    {
        [JsonPropertyName("tag_name")]
        public string TagName { get; set; } = string.Empty;

        [JsonPropertyName("assets")]
        public List<GitHubAsset> Assets { get; set; } = [];
    }

    public class GitHubAsset
    {
        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;

        [JsonPropertyName("browser_download_url")]
        public string BrowserDownloadUrl { get; set; } = string.Empty;
    }
}
