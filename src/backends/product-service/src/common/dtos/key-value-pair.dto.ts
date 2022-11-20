import { IsUUID } from 'class-validator';

/**
 * Key value a pair of the given entity.
 */
export class KeyValuePairDto {
  /**
   * Guid identifier.
   */
  @IsUUID()
  id: string;
  /**
   * Model display name.
   */
  name: string;
}
