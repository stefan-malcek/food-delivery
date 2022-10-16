using Duende.IdentityServer.Models;

namespace FoodDelivery.IdentityService.WebApi.Settings;

public class IdentityServerSettings
{
    public IReadOnlyCollection<ApiScope> ApiScopes { get; set; } = Array.Empty<ApiScope>();
    public IReadOnlyCollection<Client> Clients { get; set; }
    public IReadOnlyCollection<IdentityResource> IdentityResources { get; set; } = new IdentityResource[]
    {
        new IdentityResources.OpenId()
    };
}