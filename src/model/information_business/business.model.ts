export class BusinessInfoRequest {
  bussinessName: string = "";
  address: string = "";
  bussinessLogo: string = "";
  phone: string = "";
  email: string = "";
  npwp?: string;
}

export class BusinessInfoResponse {
  id: string = "";
  userId: string = "";
  bussinessName: string = "";
  address: string = "";
  bussinessLogo: string = "";
  phone: string = "";
  email: string = "";
  npwp?: string | null;
}
