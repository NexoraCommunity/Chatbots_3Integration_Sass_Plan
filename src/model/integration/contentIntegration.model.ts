export interface WebsiteConfig {
  provider: 'website';
  botName: string;
  domain: string;
  img: string;
}

export interface botFatherConfig {
  provider: 'botFather';
  botName: string;
  accessToken: string;
}

export interface WabaConfig {
  provider: 'whatsapp Bussiness';
  numberPhoneId: string;
  whatsaapBussinessAccountId: string;
}

export interface MidtransConfig {
  provider: 'midtrans';
  name: string;
  serverKey: string;
  clientKey: string;
  webhookVerif: string;
}

export interface XenditConfig {
  provider: 'xendit';
  name: string;
  serverKey: string;
  webhookToken: string;
  webhookVerif: string;
}

export interface RajaOngkirConfig {
  provider: 'rajaOngkir';
  name: string;
  apiKey: string;
  courier: string;
  origin: string;
}

export type ContentIntegrationConfig =
  | WebsiteConfig
  | botFatherConfig
  | WabaConfig
  | MidtransConfig
  | XenditConfig
  | RajaOngkirConfig;

export type ContentIntegration = {
  id: string;
  userIntegrationId: string;
  type: string;
  configJson: ContentIntegrationConfig;
  isUsed: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ContentIntegrationRequest = {
  type: string;
  configJson: ContentIntegrationConfig;
  userIntegrationId?: string;
};

export type ContentIntegrationResponse = {
  data: ContentIntegration;
  status: string;
};
