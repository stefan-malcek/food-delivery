import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '@common/entities/base.entity';

@Entity()
export class Product extends BaseEntity {
  @Property({ length: 100 })
  name!: string;

  @Property()
  price!: number;

  @Property({ columnType: 'text' })
  description!: string;
}
