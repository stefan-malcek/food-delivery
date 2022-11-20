import { KeyValuePairDto } from '@common/dtos/key-value-pair.dto';
import { IsUUID, MaxLength, Min } from 'class-validator';

/**
 * Meal product detail.
 */
export class ProductDetailDto {
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
  /**
   * Meal description.
   */
  description?: string;
  /**
   * Meal categories.
   */
  categories: KeyValuePairDto[];
}
