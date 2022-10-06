namespace FoodDelivery.IdentityService.WebApi.Dtos.Responses;

public class Metadata
{
    /// <summary>
    /// Items Offset
    /// </summary>
    public int? Offset { get; }
    /// <summary>
    /// Page Size
    /// </summary>
    public int? Limit { get; }
    /// <summary>
    /// Total numbers of items
    /// </summary>
    public int? TotalItems { get; }
    /// <summary>
    /// Dynamic metadata
    /// </summary>
    public object? Payload { get; }

    public Metadata(object? payload)
    {
        Payload = payload;
    }

    public Metadata(int offset, int limit, int totalItems, object? payload = null) : this(payload)
    {
        Offset = offset;
        Limit = limit;
        TotalItems = totalItems;
    }
}