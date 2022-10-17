import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProductDto } from '@application/products/queries/get-product-list/product.dto';
import { ProductDetailDto } from '@application/products/queries/get-product-detail/product-detail.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { SaveProductDto } from '@application/products/commands/common/save-product.dto';
import {
  ApiArrayDataResponseDto,
  ApiDataResponseDto,
  ApiResponseDto,
} from '@application/common/dtos/api-response.dto';
import { CreatedEntityDto } from '@application/common/dtos/created-entity.dto';
import { ApiArrayDataResponse } from '@/api/helpers/api-array-data-response.decorator';
import { ApiDataResponse } from '@/api/helpers/api-data-response.decorator';

@ApiTags('products')
@Controller('products')
@ApiExtraModels(() => ApiArrayDataResponseDto)
export class ProductsController {
  @Get()
  @ApiArrayDataResponse(ProductDto)
  async geProducts(): Promise<ApiArrayDataResponseDto<ProductDto>> {
    return;
  }

  @Get(':id')
  @ApiDataResponse(ProductDetailDto)
  async getProductDetail(
    @Param() id: string,
  ): Promise<ApiDataResponseDto<ProductDetailDto>> {
    return null;
  }

  @Post()
  @ApiDataResponse(CreatedEntityDto)
  async createProduct(
    @Body() createProduct: SaveProductDto,
  ): Promise<ApiDataResponseDto<CreatedEntityDto>> {
    return;
  }

  @Put(':id')
  async updateProduct(
    @Param() id: string,
    @Body() updateProduct: SaveProductDto,
  ): Promise<ApiResponseDto> {
    return;
  }
}
