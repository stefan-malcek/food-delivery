import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProductDto } from '@/products/queries/get-product-list/product.dto';
import { ProductDetailDto } from '@/products/queries/get-product-detail/product-detail.dto';
import { ApiTags } from '@nestjs/swagger';
import { SaveProductDto } from '@/products/commands/common/save-product.dto';
import { ApiArrayDataResponse } from '@/common/decorators/api-array-data-response.decorator';
import { ApiDataResponse } from '@/common/decorators/api-data-response.decorator';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductCommand } from '@/products/commands/create-product/create-product.command';
import { BaseController } from '@/common/controllers/base.controller';
import { UpdateProductCommand } from '@/products/commands/update-product/update-product.command';
import { GetProductDetailQuery } from '@/products/queries/get-product-detail/get-product-detail.query';
import { GetProductListQuery } from '@/products/queries/get-product-list/get-product-list.query';
import {
  ApiArrayDataResponseDto,
  ApiDataResponseDto,
  ApiResponseDto,
} from '@common/dtos/api-response.dto';
import { CreatedEntityDto } from '@common/dtos/created-entity.dto';

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
