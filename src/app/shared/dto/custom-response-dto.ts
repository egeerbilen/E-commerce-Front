export type CustomResponseDto<T> = {
  data: T | null;
  errors: string[] | null;
};
