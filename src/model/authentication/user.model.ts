export class RegisterUserRequest {
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
}

export class LoginUserRequest {
  email!: string;
  password!: string;
}

export interface UserResponse {
  firstName: string;
  lastName: string;
  email: string;
  refreshToken?: string;
  accessToken?: string;
}

export interface UpdateUserProfile {
  picture?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface EmailConfig {
  recipients: string;
  html: string;
  subject: string;
  text?: string;
}

export interface VerificationRequest {
  codeOTP: string;
  email: string;
}

export interface ChangePasswordRequest {
  oldPassword?: string;
  newPassword?: string;
  email?: string;
}

export interface GoogleOauth {
  id: string;
  firstName: string;
  lastName: string;
  picture: string;
  provider: string;
  scope: string[];
  email: string;
}

export interface FacebookOauth {
  userId: string;
  facebookId: string;
  name: string;
  email?: string;
  accessToken: string;
  picture?: string;
  busineesId: string;
  wabaId: string;
}

export class SubscribtionInfo {
  id!: number;
  name!: string;
  price!: number;
  initialToken!: number;
  durationDays!: number;
}

export class UserSubcribtionInfo {
  id!: string;
  tokenRemain!: number;
  startDate!: Date;
  endDate!: Date;
  subcribtion!: SubscribtionInfo;
}

export interface GetCurrentUser {
  id: string;
  firstName: string;
  lastName?: string | null;
  email: string;
  picture?: string | null;
  phone?: string | null;
  token?: string | null;
  businessName?: string | null;
  address?: string | null;
  role?: string | null;
  subscriptionPlan?: string | null;
  userSubcription?: UserSubcribtionInfo[];
}

export interface PostCurrentUser {
  id: string;
  firstName: string;
  lastName?: string | null;
  picture?: string | null;
  phone?: string | null;
}

export interface VerifPassword {
  email: string;
  password: string;
  codeOTP: string;
}

export interface UpdatePassworduser {
  email: string;
}

export interface WebResponse<T> {
  data?: T;
  status: string;
  message: string;
}
