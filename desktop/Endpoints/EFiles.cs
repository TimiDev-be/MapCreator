using desktop.Classes;
using desktop.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Text;

namespace desktop.Endpoints
{
    public static class EFiles
    {
        public static void FilesEndpoints(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("/api/files");
            group.MapGet("/data", async (FilesService filesService) =>
            {
                try
                {
                    var data = await filesService.DownloadDataFile();
                    return Results.File(data, "application/json", $"MapCreator_data_{DateTime.Now:yyyyMMddHHmmss}.json");
                }
                catch (Exception ex)
                {
                    await new Log(LogStatus.Error, "Something went wrong while downloading data file", ex.Message.ToString()).Save();
                    return Results.Problem("Something went wrong while downloading data file", statusCode: 500);
                }
            });
        }
    }
}
