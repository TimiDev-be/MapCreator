using desktop.Classes;
using desktop.Data;
using desktop.Endpoints;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace desktop.Services
{
    public class LocalHttp(AppDataContext dataContext)
    {
        private WebApplication? _httpServer;
        public int Port { get; set; }
        public TaskCompletionSource<bool> HttpReady { get; set; } = new TaskCompletionSource<bool>();

        public async Task Start()
        {
            try
            {
                string webConfigPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "wwwroot", "dist", "config.json");
                var jsonString = File.ReadAllText(webConfigPath);
                var webConfig = JsonSerializer.Deserialize<WebConfig>(jsonString, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,
                });

                int configPort = webConfig?.Api.Port ?? 5500;
                var port = await FindAvailablePort(configPort);
                if (port == -1) return;
                Port = port;

                _httpServer = await this.CreateHttp(port);
                _httpServer.RunAsync($"http://localhost:{port}");

                HttpReady.SetResult(true);
                await new Log(LogStatus.Info, "App started", $"Version {Assembly.GetExecutingAssembly().GetName().Version?.ToString(3)}").Save();
            }
            catch (Exception ex) {
                await new Log(LogStatus.Error, "App local server start failed", ex.Message.ToString()).Save();
            }

        }
        private async Task<int> FindAvailablePort(int startPort = 5000)
        {
            var listeners = System.Net.NetworkInformation.IPGlobalProperties
                .GetIPGlobalProperties()
                .GetActiveTcpListeners();

            var usedPorts = listeners.Select(l => l.Port).ToHashSet();

            for (int port = startPort; port < startPort + 10; port++)
            {
                if (!usedPorts.Contains(port))
                    return port;
            }

            await new Log(LogStatus.Info, "Http server port", "No port available for local server").Save();
            return -1;
        }

        private async Task<WebApplication> CreateHttp(int port)
        {
            var builder = WebApplication.CreateBuilder();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("ApplicationPolicy", policy =>
                {
                    policy.WithOrigins("http://localhost:5173", "http://localhost:5550").AllowAnyHeader().AllowAnyMethod();
                });
            });

            builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(options =>
            {
                options.SerializerOptions.Converters.Add(
                    new JsonStringEnumConverter(JsonNamingPolicy.CamelCase, allowIntegerValues: true)
                );
            });

            builder.Services.AddSingleton<AppDataContext>(dataContext);
            builder.Services.AddScoped<DataService>();
            builder.Services.AddScoped<StyleService>();
            builder.Services.AddScoped<FilesService>();

            var app = builder.Build();

            app.UseCors("ApplicationPolicy");

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "wwwroot", "dist")),
                RequestPath = "",
                OnPrepareResponse = ctx => {
                    ctx.Context.Response.Headers.Append("Cache-Control", "no-cache, no-store");
                }
            });

            app.MapFallbackToFile("index.html", new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "wwwroot", "dist"))
            });

            app.StylesEndpoints();
            app.MapsEndpoints();
            app.TemplatesEndpoints();
            app.ImportEndpoints();
            app.FilesEndpoints();

            return app;
        }

        public void Stop() {
            _httpServer?.StopAsync();
        }
    }
}
