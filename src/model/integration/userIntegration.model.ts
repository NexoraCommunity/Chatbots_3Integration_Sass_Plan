export type ContentIntegration = {
  id: string;
  userIntegrationId: string;
  type: string;
  name?: string; // Optional name
  configJson: any;
  isUsed: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UserIntegration = {
  id: string;
  integrationId: number;
  name: string;
  provider?: string; // Optional provider
  type: string;
  description: string;
  isconnected: boolean;
  createdAt: string;
  updatedAt: string;
  contentIntegrations?: ContentIntegration[];
};

export type PostUserIntegration = {
  integrationId: number;
  provider: string;
  isconnected: boolean;
  userId: string;
};

export type PatchUserIntegration = {
  isconnected: boolean;
};

export type UserIntegrationResponse = {
  data: UserIntegration[];
  status: string;
};
