export type ProductCreateDto = {
  name: string;
  price: number;
  stock: number | null;
  imageData: string;
  description: string | null;
  userId: number;
  categoryId: number;
};
