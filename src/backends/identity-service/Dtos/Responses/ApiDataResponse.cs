namespace FoodDelivery.IdentityService.WebApi.Dtos.Responses;

public class ApiDataResponse<T> : ApiResponse
{
    public T Data { get; }

    public ApiDataResponse(T data, Metadata? metadata = null)
        : base(metadata: metadata)
    {
        Data = data;
    }
}