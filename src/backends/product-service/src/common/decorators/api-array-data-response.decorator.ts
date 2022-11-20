import { ApiArrayDataResponseDto } from '@common/dtos/api-response.dto';
import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiArrayDataResponse = <TModel extends Type>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(ApiArrayDataResponseDto, model),
    ApiOkResponse({
      schema: {
        title: `ApiArrayDataResponseOf${model.name}`,
        allOf: [
          { $ref: getSchemaPath(ApiArrayDataResponseDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
        required: ['data'],
      },
    }),
  );
};
