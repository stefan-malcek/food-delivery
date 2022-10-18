import { SaveProductDto } from '@application/products/commands/common/save-product.dto';

export class UpdateProductCommand {
  constructor(
    public readonly id: string,
    public readonly updateProduct: SaveProductDto,
  ) {}
}
