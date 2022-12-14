using Duende.IdentityServer.EntityFramework.Entities;
using Duende.IdentityServer.EntityFramework.Extensions;
using Duende.IdentityServer.EntityFramework.Interfaces;
using Duende.IdentityServer.EntityFramework.Options;
using FoodDelivery.IdentityService.WebApi.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace FoodDelivery.IdentityService.WebApi.Persistence;

public class ApplicationDbContext : IdentityDbContext<AppUser, AppRole, string>, IPersistedGrantDbContext
{
    private readonly IOptions<OperationalStoreOptions> _operationalStoreOptions;

    public ApplicationDbContext(
        DbContextOptions options,
        IOptions<OperationalStoreOptions> operationalStoreOptions)
        : base(options)
    {
        _operationalStoreOptions = operationalStoreOptions;
    }

    public DbSet<PersistedGrant> PersistedGrants { get; set; } = null!;
    public DbSet<DeviceFlowCodes> DeviceFlowCodes { get; set; } = null!;
    public DbSet<Key> Keys { get; set; } = null!;

    Task<int> IPersistedGrantDbContext.SaveChangesAsync() => base.SaveChangesAsync();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ConfigurePersistedGrantContext(_operationalStoreOptions.Value);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.LogTo(Console.WriteLine);
}