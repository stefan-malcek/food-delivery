using FoodDelivery.IdentityService.WebApi.Interfaces;

namespace FoodDelivery.IdentityService.WebApi.Services;

public class MachineDateTimeProvider : IDateTimeProvider
{
    public DateTime UtcNow => DateTime.UtcNow;
}