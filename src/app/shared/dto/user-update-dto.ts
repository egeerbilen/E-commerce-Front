import { BaseDto } from './base-dto';

export type UserUpdateDto = BaseDto & {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address?: string;
};
