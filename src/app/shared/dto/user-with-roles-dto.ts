import { BaseDto } from './base-dto';
import { UserRolesDto } from './user-roles-dto';

export type UserWithRolesDto = BaseDto & {
  firstName: string;
  lastName: string;
  email: string;
  roles: UserRolesDto[];
};
