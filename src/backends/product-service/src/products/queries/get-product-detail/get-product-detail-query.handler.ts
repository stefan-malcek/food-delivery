import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductDetailQuery } from '@/products/queries/get-product-detail/get-product-detail.query';
import { ProductDetailDto } from '@/products/queries/get-product-detail/product-detail.dto';

@QueryHandler(GetProductDetailQuery)
export class GetProductDetailQueryHandler
  implements IQueryHandler<GetProductDetailQuery, ProductDetailDto>
{
  execute(query: GetProductDetailQuery): Promise<ProductDetailDto> {
    const { id } = query;
    console.log({ id });
    return Promise.resolve({ id: '', name: '', price: 0, categories: [] });
  }
}