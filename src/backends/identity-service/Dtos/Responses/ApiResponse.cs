namespace FoodDelivery.IdentityService.WebApi.Dtos.Responses;

public class ApiResponse
{
    public string Message { get; }
    public Metadata? Metadata { get; }

    public ApiResponse(string message = "Ok", Metadata? metadata = null)
    {
        Message = message;
        Metadata = metadata;
    }
}