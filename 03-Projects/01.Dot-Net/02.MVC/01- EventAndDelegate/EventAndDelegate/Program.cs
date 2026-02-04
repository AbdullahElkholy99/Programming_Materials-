// ============================================
// Program.cs - ASP.NET Core MVC Configuration
// ============================================

using EventAndDelegate.Events;
using EventAndDelegate.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllersWithViews();

// Register services as Singletons to maintain event subscriptions
builder.Services.AddSingleton<OrderService>();
builder.Services.AddSingleton<LoggingService>();
builder.Services.AddSingleton<EmailService>();
builder.Services.AddSingleton<InventoryMonitorService>();

// Register event subscriptions
builder.Services.AddSingleton<EventSubscriptionManager>();

var app = builder.Build();

// Initialize event subscriptions
var subscriptionManager = app.Services.GetRequiredService<EventSubscriptionManager>();
subscriptionManager.Initialize(
    app.Services.GetRequiredService<OrderService>(),
    app.Services.GetRequiredService<LoggingService>(),
    app.Services.GetRequiredService<EmailService>(),
    app.Services.GetRequiredService<InventoryMonitorService>()
);

// Configure the HTTP request pipeline
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();


