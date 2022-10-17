import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ApiArrayDataResponseDto } from '@application/common/dtos/api-response.dto';

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
