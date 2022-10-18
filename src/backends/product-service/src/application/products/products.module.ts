import { Module } from '@nestjs/common';
import { CreateProductCommandHandler } from '@application/products/commands/create-product/create-product-command.handler';
import { UpdateProductCommandHandler } from '@application/products/commands/update-product/update-product-command.handler';
import { GetProductDetailQueryHandler } from '@application/products/queries/get-product-detail/get-product-detail-query.handler';
import { GetProductListQueryHandler } from '@application/products/queries/get-product-list/get-product-list-query.handler';

@Module({
  providers: [
    CreateProductCommandHandler,
    UpdateProductCommandHandler,
    GetProductDetailQueryHandler,
    GetProductListQueryHandler,
  ],
})
export class ProductsModule {}
