using FoodDelivery.IdentityService.WebApi.Entities;
using Microsoft.AspNetCore.Identity;

namespace FoodDelivery.IdentityService.WebApi.Persistence;

public static class ApplicationDbContextSeed
{
    public static readonly List<Tuple<AppUser, string, string>> Users = new()
    {
        new Tuple<AppUser, string, string>(new AppUser
        {
            UserName = "customer.user@example.com",
            EmailConfirmed = true
        }, "Password1", "Customer"),
        new Tuple<AppUser, string, string>(new AppUser
        {
            UserName = "operator.user@example.com",
            EmailConfirmed = true
        }, "Password2", "Operator")
    };

    public static async Task SeedRolesAsync(RoleManager<AppRole> roleManager)
    {
        await SeedRoleAsync(roleManager, "Customer");
        await SeedRoleAsync(roleManager, "Operator");
    }

    public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
    {
        foreach (var (user, password, role) in Users)
        {
            if (!userManager.Users.All(u => u.UserName != user.UserName)) continue;

            user.Email = user.UserName;

            await userManager.CreateAsync(user, password);
            await userManager.AddToRolesAsync(user, new[] { role });
        }
    }

    private static async Task SeedRoleAsync(RoleManager<AppRole> roleManager, string role)
    {
        var identityRole = new AppRole { Name = role };
        if (roleManager.Roles.All(r => r.Name != identityRole.Name))
        {
            await roleManager.CreateAsync(identityRole);
        }
    }
}