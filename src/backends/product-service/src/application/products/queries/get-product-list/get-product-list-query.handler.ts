import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetProductListQuery } from '@application/products/queries/get-product-list/get-product-list.query';
import { ProductDto } from '@application/products/queries/get-product-list/product.dto';

@QueryHandler(GetProductListQuery)
export class GetProductListQueryHandler
  implements IQueryHandler<GetProductListQuery>
{
  execute(query: GetProductListQuery): Promise<ProductDto[]> {
    return Promise.resolve([]);
  }
}
