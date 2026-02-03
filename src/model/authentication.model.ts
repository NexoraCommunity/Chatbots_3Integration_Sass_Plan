export type RegisterProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type LoginProps = {
  email: string;
  password: string;
};
export type OtpCodeProps = {
  email: string;
  codeOTP: string;
};

export type User = {
  id: true;
  firstName: true;
  email: true;
  lastName: true;
  picture: true;
};
