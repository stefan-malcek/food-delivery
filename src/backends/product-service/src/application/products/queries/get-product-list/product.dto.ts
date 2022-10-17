/**
 * Food product.
 */
import { IsUUID, MaxLength, Min } from 'class-validator';

export class ProductDto {
  /**
   * Guid identifier.
   */
  @IsUUID()
  id: string;
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
}
