import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity({ abstract: true })
export abstract class BaseEntity {
  @PrimaryKey({ type: 'uuid' })
  uuid: string = v4();

  @Property({ type: 'timestamp' })
  createdAt = new Date();

  @Property({ type: 'timestamp', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ version: true })
  version!: number;
}
