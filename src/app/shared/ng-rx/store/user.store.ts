import { DecodedTokenWithJwtDto } from '../../dto/decoded-token-with-jwt-dto';

export type UserState = {
  userData: DecodedTokenWithJwtDto | null;
};

export const userInitialState: UserState = {
  userData: null
};
