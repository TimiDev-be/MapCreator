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
    public static class EStyles
    {
        public static void StylesEndpoints(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("/api/styles");
            group.MapGet("/", async (StyleService styleService) =>
            {
                try
                {
                    var styles = styleService.GetStyles();
                    return Results.Ok(styles);
                }
                catch (Exception ex)
                {
                    await new Log(LogStatus.Error, "Something went wrong while returning styles", ex.ToString()).Save();
                    return Results.Problem("Something went wrong wile returning styles", statusCode: 500);
                }
            });
        }
    }
}
