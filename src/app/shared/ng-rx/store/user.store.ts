import { DecodedTokenDto } from '../../dto/decoded-token-dto';

export type UserState = {
  userData: DecodedTokenDto | null;
};

export const userInitialState: UserState = {
  userData: null
};
