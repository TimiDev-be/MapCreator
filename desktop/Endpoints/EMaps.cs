using desktop.Services;
using desktop.Classes;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Text;
using desktop.Data.Models;
using desktop.Errors;

namespace desktop.Endpoints
{
    public static class EMaps
    {
        public static void MapsEndpoints(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("/api/maps");
            group.MapGet("/", async (DataService dataService) =>
            {
                try
                {
                    var maps = dataService.GetMaps();
                    return Results.Ok(maps);
                }
                catch (Exception ex)
                {
                    await new Log(LogStatus.Error, "Something went wrong while returning maps", ex.ToString()).Save();
                    return Results.Problem("Something went wrong while returning maps", statusCode: 500);
                }
            });
            group.MapGet("/:{id}", async (Guid id, DataService dataService) =>
            {
                try
                {
                    var map = dataService.GetMap(id);
                    return Results.Ok(map);
                }
                catch (Exception ex)
                {
                    await new Log(LogStatus.Error, "Something went wrong while returning specified map", ex.ToString()).Save();
                    return Results.Problem("Something went wrong while returning specified map", statusCode: 404);
                }
            });
            group.MapPost("/", async (string name, DataService dataService) =>
            {
                try
                {
                    var map = dataService.NewMap(name);
                    return Results.Ok(map);
                } 
                catch (AppError er)
                {
                    await new Log(LogStatus.Error, er.Title, er.Message).Save();
                    return Results.Problem(er.Message, statusCode: 500);
                }
                catch (Exception ex)
                {
                    await new Log(LogStatus.Error, "Something went wrong while creating map", ex.Message.ToString()).Save();
                    return Results.Problem("Something went wrong while creating map", statusCode: 500);
                }
            });
            group.MapPatch("/:{id}", async (Guid id, MMap map, DataService dataService) =>
            {
                try
                {
                    await dataService.UpdateMap(id, map);
                    return Results.NoContent();
                }
                catch (AppError er)
                {
                    await new Log(LogStatus.Error, er.Title, er.Message).Save();
                    return Results.Problem(er.Message, statusCode: er.StatusCode);
                }
                catch (Exception ex)
                {
                    await new Log(LogStatus.Error, "Something went wrong while updating data", ex.Message.ToString()).Save();
                    return Results.Problem("Something went wrong while updating data", statusCode: 500);
                }
            });
            group.MapDelete("/:{id}", async (Guid id, DataService dataService) =>
            {
                try
                {
                    await dataService.DeleteMap(id);
                    return Results.NoContent();
                }
                catch (Exception ex)
                {
                    await new Log(LogStatus.Error, "Something went wrong while deleting map", ex.Message.ToString()).Save();
                    return Results.Problem("Something went wrong while deleting map", statusCode: 500);
                }
            });
            group.MapPost("/delete-bunch", async (List<Guid> ids, DataService dataService) =>
            {
                try
                {
                    await dataService.DeleteBunchMaps(ids);
                    return Results.NoContent();
                }
                catch (Exception ex)
                {
                    await new Log(LogStatus.Error, "Something went wrong while deleting a bunch of maps", ex.Message.ToString()).Save();
                    return Results.Problem("Something went wrong while deleting a bunch of maps", statusCode: 500);
                }
            });
        }
    }
}
