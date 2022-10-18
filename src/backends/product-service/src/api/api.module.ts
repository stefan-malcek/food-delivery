import { Module } from '@nestjs/common';
import { PostInterceptor } from '@/api/interceptors/post.interceptor';
import { ProductsController } from '@/api/controllers/products.controller';
import { ApplicationModule } from '@application/application.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [ApplicationModule],
  controllers: [ProductsController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: PostInterceptor,
    },
  ],
})
export class ApiModule {}
