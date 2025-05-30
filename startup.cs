app.Use(async (context, next) =>
{
    // Remove CSP for local development
    context.Response.Headers.Remove("Content-Security-Policy");
    await next();
});
