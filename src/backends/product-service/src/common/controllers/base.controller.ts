import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiArrayDataResponseDto,
  ApiDataResponseDto,
  ApiResponseDto,
} from '@common/dtos/api-response.dto';

export abstract class BaseController {
  protected constructor(
    protected queryBus: QueryBus,
    protected commandBus: CommandBus,
  ) {}

  OkApiResponse(): ApiResponseDto {
    return new ApiResponseDto();
  }

  OkApiDataResponse<T>(data: T): ApiDataResponseDto<T> {
    return new ApiDataResponseDto<T>(data);
  }

  OkApiArrayDataResponse<T>(data: T[]): ApiArrayDataResponseDto<T> {
    return new ApiArrayDataResponseDto<T>(data);
  }
}
