using desktop.Classes;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace desktop.Services
{
    public class LocalHttp
    {
        private WebApplication? _httpServer;
        public int Port { get; set; }
        public TaskCompletionSource<bool> HttpReady { get; set; } = new TaskCompletionSource<bool>();
    
        public async Task Start()
        {
            var port = FindAvailablePort(5500);
            Port = port;
            _httpServer = await this.CreateHttp(port);
            _httpServer.RunAsync($"http://localhost:{port}");
            HttpReady.SetResult(true);
        }
        private int FindAvailablePort(int startPort = 5000)
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

            throw new Exception("No available port found.");
        }

        private async Task<WebApplication> CreateHttp(int port)
        {
            var builder = WebApplication.CreateBuilder();
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.AllowAnyOrigin();
                });
            });

            builder.Services.AddScoped<DataService>();
            builder.Services.AddScoped<UrlService>();

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

            app.MapGet("/api/style", async (UrlService configService) =>
            {
                var style = await configService.GetUrl();
                return Results.Ok(style);
            });

            app.MapGet("/api/data", async (DataService dataService) =>
            {
                var data = await dataService.GetData();
                return Results.Ok(data);
            });

            app.MapPatch("/api/data", async (DataPatch dataPatch, DataService dataService) =>
            {
                await dataService.UpdateData(dataPatch.DataPatchValue);
                return Results.NoContent();
            });

            return app;
        }

        public void Stop() {
            _httpServer?.StopAsync();
        }
    }
}
