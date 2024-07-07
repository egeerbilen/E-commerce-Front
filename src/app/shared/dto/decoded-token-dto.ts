export type DecodedTokenDto = {
  email: string;
  firstName: string;
  lastName: string;
  userId: string;
  roles: string[];
  exp: number;
  iss: string;
  aud: string;
};
