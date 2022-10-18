import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductsModule } from '@application/products/products.module';

@Module({
  imports: [CqrsModule, ProductsModule],
  exports: [CqrsModule],
})
export class ApplicationModule {}
