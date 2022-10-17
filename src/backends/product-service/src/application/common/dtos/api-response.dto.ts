import { ApiHideProperty } from '@nestjs/swagger';

export class ApiMetadata {
  page?: number;
  pageSize?: number;
  totalItems?: number;
  payload?: object;
}

export class ApiResponseDto {
  message = 'Ok';
  metadata?: ApiMetadata;
}

export class ApiDataResponseDto<T> extends ApiResponseDto {
  @ApiHideProperty()
  data: T;
}

export class ApiArrayDataResponseDto<T> extends ApiResponseDto {
  @ApiHideProperty()
  data: T[];
}

export class ApiErrorResponseDto extends ApiResponseDto {
  errors: string[];
  errorName: string;
}
