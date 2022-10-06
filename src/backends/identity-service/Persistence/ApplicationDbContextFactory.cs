﻿using Microsoft.EntityFrameworkCore;

namespace FoodDelivery.IdentityService.WebApi.Persistence;

internal class ApplicationDbContextFactory : DesignTimeDbContextFactoryBase<ApplicationDbContext>
{
    protected override ApplicationDbContext CreateNewInstance(DbContextOptions<ApplicationDbContext> options)
    {
        return new ApplicationDbContext(options);
    }
}