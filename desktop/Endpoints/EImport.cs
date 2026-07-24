using desktop.Classes;
using desktop.Data.Models;
using desktop.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Text;

namespace desktop.Endpoints
{
    public static class EImport
    {
        public static void ImportEndpoints(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("/api/import");
            group.MapGet("/", async (DataService dataService) =>
            {
                try
                {
                    var source = dataService.GetSource();
                    return Results.Ok(source);
                }
                catch (Exception ex)
                {
                    await new Log(LogStatus.Error, "Something went wrong while returning data for merge", ex.Message.ToString()).Save();
                    return Results.Problem("Something went wrong while returning data for merge", statusCode: 500);
                }
            });
            group.MapPatch("/", async (MSource source, DataService dataService) =>
            {
                try
                {
                    await dataService.ImportData(source);
                    return Results.NoContent();
                }
                catch (Exception ex)
                {
                    await new Log(LogStatus.Error, "Something went wrong while importing data", ex.Message.ToString()).Save();
                    return Results.Problem("Something went wrong while importing data", statusCode: 500);
                }
            });
        }
    }
}
