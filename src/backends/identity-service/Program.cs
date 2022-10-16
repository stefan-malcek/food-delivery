using FoodDelivery.IdentityService.WebApi.Entities;
using FoodDelivery.IdentityService.WebApi.Interfaces;
using FoodDelivery.IdentityService.WebApi.Persistence;
using FoodDelivery.IdentityService.WebApi.Services;
using FoodDelivery.IdentityService.WebApi.Settings;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;


namespace FoodDelivery.IdentityService.WebApi;

public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddTransient<IDateTimeProvider, MachineDateTimeProvider>();
        builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(
                builder.Configuration.GetConnectionString("DefaultConnection"),
                b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));

        builder.Services.AddIdentity<AppUser, AppRole>(Identity.ConfigureOptions)
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

        var identityServerSettings = builder.Configuration.GetSection(nameof(IdentityServerSettings))
            .Get<IdentityServerSettings>();

        builder.Services.AddIdentityServer(options =>
            {
                options.Events.RaiseSuccessEvents = true;
                options.Events.RaiseFailureEvents = true;
                options.Events.RaiseErrorEvents = true;
            })
            .AddAspNetIdentity<AppUser>()
            .AddInMemoryApiScopes(identityServerSettings.ApiScopes)
            .AddInMemoryClients(identityServerSettings.Clients)
            .AddInMemoryIdentityResources(identityServerSettings.IdentityResources)
            .AddDeveloperSigningCredential();

        builder.Services.AddMvc();
        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        using (var scope = app.Services.CreateScope())
        {
            var services = scope.ServiceProvider;

            try
            {
                var context = services.GetRequiredService<ApplicationDbContext>();

                if (context.Database.IsSqlServer())
                {
                    await context.Database.MigrateAsync();
                }

                var roleManager = services.GetRequiredService<RoleManager<AppRole>>();
                await ApplicationDbContextSeed.SeedRolesAsync(roleManager);

                var userManager = services.GetRequiredService<UserManager<AppUser>>();
                await ApplicationDbContextSeed.SeedUsersAsync(userManager);
            }
            catch (Exception ex)
            {
                var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

                logger.LogError(ex, "An error occurred while migrating or seeding the database.");

                throw;
            }
        }

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseStaticFiles();

        app.UseRouting();

        app.UseIdentityServer();

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapRazorPages();
        });

        await app.RunAsync();
    }
}
