import { SaveProductDto } from '@application/products/commands/common/save-product.dto';

export class CreateProductCommand {
  constructor(public readonly createProduct: SaveProductDto) {}
}
