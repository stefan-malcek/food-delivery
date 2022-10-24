import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ApiDataResponseDto } from '@common/dtos/api-response.dto';

export const ApiDataResponse = <TModel extends Type>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(ApiDataResponseDto, model),
    ApiOkResponse({
      schema: {
        title: `ApiDataResponseOf${model.name}`,
        allOf: [
          { $ref: getSchemaPath(ApiDataResponseDto) },
          {
            properties: {
              data: {
                type: 'object',
                $ref: getSchemaPath(model),
              },
            },
          },
        ],
        required: ['data'],
      },
    }),
  );
};
