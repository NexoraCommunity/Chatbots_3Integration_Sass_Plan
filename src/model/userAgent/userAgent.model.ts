import { Pagination } from "../category/web.model";

export interface OtherContentApi {
  name: string;
  text: string;
  image?: string | null;
}

export interface UserAgentApi {
  id: string;
  name: string;
  agent: string;
  filePath: string;
  prompt: string | null;
  vectorStatus: string;
  paymentAutomation: boolean | null;
  paymentContentIntegrationId: string | null;
  otherContents: OtherContentApi[];
  ongkirChecker: boolean | null;
  ongkirContentIntegrationId: string | null;
  productIds: string[];
}

export interface ChangeUserAgent {
  id: string;
  name: string;
  prompt: string | null;
  agent: string;
  productIds: string[];
  userId: string;
  otherContents: OtherContentApi[];
  filePath: string;
  paymentAutomation: boolean | null;
  paymentContentIntegrationId: string | null;
  ongkirChecker: boolean | null;
  ongkirContentIntegrationId: string | null;
}

export interface PostUserAgent {
  userId: string;
  name: string;
  agent: string;
  productIds: string[];
  otherContents: OtherContentApi[];
  filePath: string;
  prompt: string | null;
  paymentAutomation: boolean | null;
  paymentContentIntegrationId: string | null;
  ongkirChecker: boolean | null;
  ongkirContentIntegrationId: string | null;
}

export interface GetModelUserAgent {
  userId?: string;
  page: string;
  limit: string;
}

export interface PaginationResponseUserAgent {
  data: UserAgentApi[];
  pagination: Pagination;
  status: string;
}

export interface UserAgentResponseById {
  data: {
    id: string;
    name: string;
    prompt: string | null;
    agent: string;
    productIds: string[];
    userId: string;
    filePath: string;
    otherContents: OtherContentApi[];
    paymentAutomation: boolean | null;
    paymentContentIntegrationId: string | null;
    ongkirChecker: boolean | null;
    ongkirContentIntegrationId: string | null;
  };
  status: string;
}

export type UserAgent = UserAgentApi;
