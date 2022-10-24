import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from '@products/commands/create-product/create-product.command';
import { v4 as uuidv4 } from 'uuid';

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler
  implements ICommandHandler<CreateProductCommand, string>
{
  execute(command: CreateProductCommand): Promise<string> {
    const { createProduct } = command;
    console.log({ createProduct });
    return Promise.resolve(uuidv4());
  }
}
