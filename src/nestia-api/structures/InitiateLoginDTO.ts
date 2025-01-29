export type InitiateLoginDTO = {
  email: string;
  password: string;
  generateRefreshToken?: undefined | boolean;
};
