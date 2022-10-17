import { IsUUID, MaxLength, Min } from 'class-validator';

/**
 * Meal product.
 */
export class SaveProductDto {
  /**
   * Meal display name.
   */
  @MaxLength(100)
  name: string;
  /**
   * Meal price in cents.
   */
  @Min(0)
  price: number;
  /**
   * Meal description.
   */
  description?: string;
  /**
   * Meal category identifiers.
   */
  @IsUUID('all', { each: true })
  categoryIds: string[];
}
