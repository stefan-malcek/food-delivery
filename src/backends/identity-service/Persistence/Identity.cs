using Microsoft.AspNetCore.Identity;

namespace FoodDelivery.IdentityService.WebApi.Persistence;

public static class Identity
{
    public static readonly Action<IdentityOptions> ConfigureOptions = options =>
    {
        options.Password.RequiredLength = 8;
        options.Password.RequireDigit = false;
        options.Password.RequireNonAlphanumeric = false;

        options.User.RequireUniqueEmail = true;

        options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
        options.Lockout.MaxFailedAccessAttempts = 5;
        options.Lockout.AllowedForNewUsers = true;
    };
}