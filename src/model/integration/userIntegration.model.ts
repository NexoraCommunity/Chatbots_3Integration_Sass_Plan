export type UserIntegration = {
    id: string; // instance ID (e.g., "waba001")
    name: string; // mapped from provider in store
    type: string; // mapped from contentIntegrations in store
    provider: string;
    description?: string;
    isconnected: boolean;
    userId: string;
    integrationId: number;
    createdAt: string;
    updatedAt: string;
    contentIntegrations: any[];
};

export type PostUserIntegration = {
    integrationId: number;
    provider: string;
    isconnected: boolean;
    userId: string;
};
