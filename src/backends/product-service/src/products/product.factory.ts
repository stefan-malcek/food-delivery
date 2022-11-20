import { Constructor, EntityData } from '@mikro-orm/core';
import { Factory, Faker } from '@mikro-orm/seeder';
import { Product } from '@products/product.entity';

export class ProductFactory extends Factory<Product> {
  readonly model: Constructor<Product>;

  protected definition(faker: Faker): EntityData<Product> {
    return {
      name: faker.commerce.productName(),
      price: +faker.commerce.price(50, 1000),
      description: faker.commerce.productDescription(),
    };
  }
}
