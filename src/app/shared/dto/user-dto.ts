import { BaseDto } from './base-dto';

export type UserDto = BaseDto & {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address?: string;
};
