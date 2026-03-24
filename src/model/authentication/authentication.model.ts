import type { UserSubcribtionInfo } from "./user.model";

export type RegisterProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword?: string;
};

export type LoginProps = {
  email: string;
  password: string;
};
export type OtpCodeProps = {
  email: string;
  codeOTP: string;
};

export type PostCurrentUser = {
  id: string;
  firstName: string;
  lastName?: string | null;
  picture?: string | null;
};

export type UpdatePassworduser = {
  id: string;
  email: string;
  password: string;
  codeOTP: string;
};
export type VerifPassword = {
  id: string;
  email: string;
};

export type User = {
  id: string;
  firstName: string;
  email: string;
  lastName: string;
  picture: string;
  subscriptionPlan?: string;
  userSubcription?: UserSubcribtionInfo[];
};
