﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace FoodDelivery.IdentityService.WebApi.Persistence;

public abstract class DesignTimeDbContextFactoryBase<TContext> : IDesignTimeDbContextFactory<TContext> where TContext : DbContext
{
    private const string ConnectionStringName = "DefaultConnection";
    private const string AspNetCoreEnvironment = "ASPNETCORE_ENVIRONMENT";

    public TContext CreateDbContext(string[] args)
    {
        var basePath = Directory.GetCurrentDirectory();
        return Create(basePath, Environment.GetEnvironmentVariable(AspNetCoreEnvironment));
    }

    protected abstract TContext CreateNewInstance(DbContextOptions<TContext> options);

    private TContext Create(string basePath, string? environmentName)
    {
        if (string.IsNullOrEmpty(environmentName))
        {
            throw new ArgumentException($"Environment variable '{AspNetCoreEnvironment}' is null or empty.", nameof(environmentName));
        }

        var configuration = new ConfigurationBuilder()
            .SetBasePath(basePath)
            .AddJsonFile("appsettings.json")
            .AddJsonFile($"appsettings.{environmentName}.json")
            .AddEnvironmentVariables()
            .Build();

        var connectionString = configuration.GetConnectionString(ConnectionStringName);
        return Create(connectionString);
    }

    private TContext Create(string connectionString)
    {
        if (string.IsNullOrEmpty(connectionString))
        {
            throw new ArgumentException($"Connection string '{ConnectionStringName}' is null or empty.", nameof(connectionString));
        }

        Console.WriteLine($"DesignTimeDbContextFactoryBase.Create(string): Connection string: '{connectionString}'.");

        var optionsBuilder = new DbContextOptionsBuilder<TContext>();
        optionsBuilder.UseSqlServer(connectionString);

        return CreateNewInstance(optionsBuilder.Options);
    }
}