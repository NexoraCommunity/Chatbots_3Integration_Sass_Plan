import { Pagination } from "../category/web.model";

export interface Bot {
  id: string;
  userId: string;
  agentId: string;
  contentIntegrationId: string | null;
  botName: string;
  type: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BotLog {
  id: string;
  botId: string;
  target: string;
  action: string;
  user: string;
  time: string;
  type?: 'info' | 'success' | 'error' | 'warning';
}

export class BotApi {
  userId!: string;
  agentId!: string;
  contentIntegrationId!: string | null;
  botName!: string;
}

export class changeBot {
  id!: string;
  agentId!: string;
  type!: string;
  userId!: string;
  integrationId!: string | null;
  botName!: string;
}

export class startBot {
  botId!: string;
  type!: string;
  agentId!: string;
  contentIntegrationId?: string;
}

export class ChatWebsite {
  botId!: string;
  sid!: string;
  message!: string;
}

export class botStatus {
  botId!: string;
  type!: string;
  contentIntegrationId?: string;
}

export class ResponseBot {
  botId?: string;
  message?: string;
  type?: string;
  qrCode?: string;
  log?: BotLog;
}

export interface BotConnectionResponse {
  botId: string;
  status?: string;
  message?: string;
  type?: string;
  qrCode?: string;
  isActive?: boolean;
}

export class postBot {
  userId!: string;
  agentId!: string;
  botName!: string;
  type!: string;
  contentIntegrationId?: string | null;
}

export class GetModelbot {
  userId?: string;
  type?: string;
  page!: string;
  limit!: string;
}

export class PaginationResponseBot {
  bot!: Bot[];
  Pagination!: Pagination;
}
