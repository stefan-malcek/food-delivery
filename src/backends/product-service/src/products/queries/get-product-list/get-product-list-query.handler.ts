import { QueryResult } from '@common/models/query-result.model';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductListQuery } from '@products/queries/get-product-list/get-product-list.query';
import { ProductDto } from '@products/queries/get-product-list/product.dto';

@QueryHandler(GetProductListQuery)
export class GetProductListQueryHandler
  implements IQueryHandler<GetProductListQuery, QueryResult<ProductDto>>
{
  execute(query: GetProductListQuery): Promise<QueryResult<ProductDto>> {
    return Promise.resolve({ page: 1, pageSize: 10, totalItems: 0, items: [] });
  }
}
