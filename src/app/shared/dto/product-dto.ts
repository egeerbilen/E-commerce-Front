import { BaseDto } from './base-dto';

export type ProductDto = BaseDto & {
  name: string;
  price: number;
  stock: number | null;
  imageData: string;
  description: string | null;
  userId: number;
  categoryId: number;
  id: number;
  createdDate: Date;
  updatedDate: Date;
};
