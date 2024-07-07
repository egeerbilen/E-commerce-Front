export type DecodedTokenDto = {
  email: string;
  firstName: string;
  lastName: string;
  userId: number;
  roles: string[];
  exp: number;
  iss: string;
  aud: string;
};
