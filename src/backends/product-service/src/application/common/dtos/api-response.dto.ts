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

  constructor(data: T, metadata?: ApiMetadata) {
    super();

    this.data = data;
    this.metadata = metadata;
  }
}

export class ApiArrayDataResponseDto<T> extends ApiResponseDto {
  @ApiHideProperty()
  data: T[];

  constructor(data: T[], metadata?: ApiMetadata) {
    super();

    this.data = data;
    this.metadata = metadata;
  }
}

export class ApiErrorResponseDto extends ApiResponseDto {
  errors: string[];
  errorName: string;
}
