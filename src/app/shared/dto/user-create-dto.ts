import { BaseDto } from './base-dto';

export type UserCreateDto = BaseDto & {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address?: string;
};
