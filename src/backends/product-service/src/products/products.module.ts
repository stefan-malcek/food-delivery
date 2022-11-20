import { CommonModule } from '@common/common.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CreateProductCommandHandler } from '@products/commands/create-product/create-product-command.handler';
import { UpdateProductCommandHandler } from '@products/commands/update-product/update-product-command.handler';
import { Product } from '@products/product.entity';
import { ProductsController } from '@products/products.controller';
import { GetProductDetailQueryHandler } from '@products/queries/get-product-detail/get-product-detail-query.handler';
import { GetProductListQueryHandler } from '@products/queries/get-product-list/get-product-list-query.handler';

@Module({
  imports: [CommonModule, MikroOrmModule.forFeature([Product])],
  providers: [
    CreateProductCommandHandler,
    UpdateProductCommandHandler,
    GetProductDetailQueryHandler,
    GetProductListQueryHandler,
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
