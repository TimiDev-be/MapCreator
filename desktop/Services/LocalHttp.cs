using desktop.Classes;
using desktop.Data;
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
                options.AddDefaultPolicy(policy =>
                {
                    policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                });
            });

            builder.Services.AddSingleton<AppDataContext>(dataContext);
            builder.Services.AddScoped<DataService>();
            builder.Services.AddScoped<StyleService>();

            var app = builder.Build();

            app.UseCors();

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

            app.MapGet("/api/style", async (StyleService _styleService) =>
            {
                try
                {
                    var style = _styleService.GetActiveStyle();
                    return Results.Ok(style);
                }
                catch (Exception ex) {
                    await new Log(LogStatus.Error, "Styles data return error", ex.Message.ToString()).Save();
                    return Results.Problem("Something went wrong while returning styles data.");
                }
            });

            app.MapGet("/api/data", async (DataService _dataService) =>
            {
                try
                {
                    var data = await _dataService.GetData();
                    return Results.Ok(data);
                }
                catch (Exception ex)
                {
                    await new Log(LogStatus.Error, "Data return error", ex.Message.ToString()).Save();
                    return Results.Problem("Something went wrong while returning maps / templates data.");
                }
            });

            app.MapPatch("/api/data", async (DataPatch dataPatch, DataService _dataService) =>
            {
                try
                {
                    await _dataService.UpdateData(dataPatch.DataPatchValue);
                    return Results.NoContent();
                }
                catch (Exception ex)
                {
                    await new Log(LogStatus.Error, "Data update error", ex.Message.ToString()).Save();
                    return Results.Problem("Something went wrong while updating data.");
                }
            });

            return app;
        }

        public void Stop() {
            _httpServer?.StopAsync();
        }
    }
}
