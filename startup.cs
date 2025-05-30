app.Use(async (context, next) =>
{
    // Remove CSP for local development
    context.Response.Headers.Remove("Content-Security-Policy");
    await next();
});


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
        // No CSP config should be here
    });
});
