import { IsUUID } from 'class-validator';

export class CreatedEntityDto {
  /**
   * Guid identifier.
   */
  @IsUUID()
  id: string;
}
