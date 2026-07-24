using desktop.Services;
using desktop.Classes;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Text;
using desktop.Errors;
using desktop.Data.Models;

namespace desktop.Endpoints
{
    public static class ETemplates
    {
        public static void TemplatesEndpoints(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("/api/templates");
            group.MapGet("/", async (DataService dataService) =>
            {
                try { 
                    var templates = dataService.GetTemplates();
                    return Results.Ok(templates);
                }
                catch (Exception ex)
                {
                    await new Log(LogStatus.Error, "Something went wrong while returning templates", ex.Message.ToString()).Save();
                    return Results.Problem("Something went wrong while returning templates", statusCode: 500);
                }
            });
            group.MapGet("/:{id}", async (Guid id, DataService dataService) =>
            {
                try
                {
                    var template = dataService.GetTemplate(id);
                    return Results.Ok(template);
                }
                catch (Exception ex)
                {
                    await new Log(LogStatus.Error, "Something went wrong while returning template", ex.Message.ToString()).Save();
                    return Results.Problem("Something went wrong while returning template", statusCode: 500);
                }
            });
            group.MapPost("/", async (string htmlContent, DataService dataService) =>
            {
                try
                {
                    var template = dataService.NewTemplate(htmlContent);
                    return Results.Ok(template);
                }
                catch (AppError er)
                {
                    await new Log(LogStatus.Error, er.Title, er.Description).Save();
                    return Results.Problem(er.Description, statusCode: er.StatusCode);
                }
                catch (Exception ex)
                {
                    await new Log(LogStatus.Error, "Something went wrong while creating template", ex.Message.ToString()).Save();
                    return Results.Problem("Something went wrong while creating template", statusCode: 500);
                }
            });
            group.MapPatch("/:{id}", async (Guid id, MTemplate template, DataService dataService) =>
            {
                try
                {
                    await dataService.UpdateTemplate(id, template);
                    return Results.NoContent();
                }
                catch (AppError er)
                {
                    await new Log(LogStatus.Error, er.Title, er.Description).Save();
                    return Results.Problem(er.Description, statusCode: er.StatusCode);
                }
                catch (Exception ex)
                {
                    await new Log(LogStatus.Error, "Something went wrong while updating template", ex.Message.ToString()).Save();
                    return Results.Problem("Something went wrong while updating template", statusCode: 500);
                }
            });
            group.MapDelete("/:{id}", async (Guid id, DataService dataService) =>
            {
                try
                {
                    await dataService.DeleteTemplate(id);
                    return Results.NoContent();
                }
                catch (Exception ex)
                {
                    await new Log(LogStatus.Error, "Something went wrong while deleting template", ex.Message.ToString()).Save();
                    return Results.Problem("Something went wrong while deleting template", statusCode: 500);
                }
            });
        }
    }
}
