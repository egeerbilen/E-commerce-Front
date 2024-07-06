export type CustomResponseDto<T> = {
  data: T;
  statusCode: number;
  errors: string[];
};
