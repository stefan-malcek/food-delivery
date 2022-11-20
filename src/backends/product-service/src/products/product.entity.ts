import { BaseEntity } from '@common/entities/base.entity';
import { Entity, Property } from '@mikro-orm/core';

@Entity()
export class Product extends BaseEntity {
  @Property({ length: 100 })
  name!: string;

  @Property({ columnType: 'decimal(19,4)' })
  price!: number;

  @Property({ columnType: 'text' })
  description!: string;
}
