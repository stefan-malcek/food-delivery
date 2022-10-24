import { Module } from '@nestjs/common';
import { ProductsModule } from '@products/products.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PostInterceptor } from '@common/interceptors/post.interceptor';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import dbOptions from './mikro-orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRoot(dbOptions),
    ProductsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: PostInterceptor,
    },
  ],
})
export class AppModule {}
