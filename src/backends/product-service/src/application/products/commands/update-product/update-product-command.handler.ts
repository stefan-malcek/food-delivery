import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductCommand } from '@application/products/commands/update-product/update-product.command';

@CommandHandler(UpdateProductCommand)
export class UpdateProductCommandHandler
  implements ICommandHandler<UpdateProductCommand>
{
  execute(command: UpdateProductCommand): Promise<void> {
    const { id, updateProduct } = command;
    console.log({ id, updateProduct });
    return Promise.resolve();
  }
}
