import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProductDto } from '@application/products/queries/get-product-list/product.dto';
import { ProductDetailDto } from '@application/products/queries/get-product-detail/product-detail.dto';
import { ApiTags } from '@nestjs/swagger';
import { SaveProductDto } from '@application/products/commands/common/save-product.dto';
import {
  ApiArrayDataResponseDto,
  ApiDataResponseDto,
  ApiResponseDto,
} from '@application/common/dtos/api-response.dto';
import { CreatedEntityDto } from '@application/common/dtos/created-entity.dto';
import { ApiArrayDataResponse } from '@/api/decorators/api-array-data-response.decorator';
import { ApiDataResponse } from '@/api/decorators/api-data-response.decorator';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductCommand } from '@application/products/commands/create-product/create-product.command';
import { BaseController } from '@/api/controllers/base.controller';
import { UpdateProductCommand } from '@application/products/commands/update-product/update-product.command';
import { GetProductDetailQuery } from '@application/products/queries/get-product-detail/get-product-detail.query';
import { GetProductListQuery } from '@application/products/queries/get-product-list/get-product-list.query';

@ApiTags('products')
@Controller('products')
export class ProductsController extends BaseController {
  constructor(queryBus: QueryBus, commandBus: CommandBus) {
    super(queryBus, commandBus);
  }

  @Get()
  @ApiArrayDataResponse(ProductDto)
  async geProducts(): Promise<ApiArrayDataResponseDto<ProductDto>> {
    const query = new GetProductListQuery();
    const data = await this.queryBus.execute<GetProductListQuery, ProductDto[]>(
      query,
    );

    return this.OkApiArrayDataResponse(data);
  }

  @Get(':id')
  @ApiDataResponse(ProductDetailDto)
  async getProductDetail(
    @Param('id') id: string,
  ): Promise<ApiDataResponseDto<ProductDetailDto>> {
    const query = new GetProductDetailQuery(id);
    const data = await this.queryBus.execute<
      GetProductDetailQuery,
      ProductDetailDto
    >(query);

    return this.OkApiDataResponse(data);
  }

  @Post()
  @ApiDataResponse(CreatedEntityDto)
  async createProduct(
    @Body() createProduct: SaveProductDto,
  ): Promise<ApiDataResponseDto<CreatedEntityDto>> {
    const command = new CreateProductCommand(createProduct);
    const id = await this.commandBus.execute<CreateProductCommand, string>(
      command,
    );

    return this.OkApiDataResponse({ id });
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProduct: SaveProductDto,
  ): Promise<ApiResponseDto> {
    const command = new UpdateProductCommand(id, updateProduct);
    await this.commandBus.execute(command);

    return this.OkApiResponse();
  }
}
