namespace FoodDelivery.IdentityService.WebApi.Interfaces;

public interface IDateTimeProvider
{
    DateTime UtcNow { get; }
}