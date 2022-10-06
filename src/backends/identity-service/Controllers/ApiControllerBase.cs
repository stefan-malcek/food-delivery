using FoodDelivery.IdentityService.WebApi.Dtos.Responses;
using Microsoft.AspNetCore.Mvc;

namespace FoodDelivery.IdentityService.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public abstract class ApiControllerBase : ControllerBase
{
    [NonAction]
    protected ActionResult<ApiDataResponse<T>> OkResponse<T>(T data)
    {
        return Ok(new ApiDataResponse<T>(data));
    }
}