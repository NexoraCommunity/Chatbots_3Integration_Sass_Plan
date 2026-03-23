import axiosInstance from "@/src/lib/axios";
import { Bot, BotApi, changeBot, GetModelbot, postBot } from "../../model/bot/bot.model";
import { WebResponse } from "../../model/category/web.model";

export const addNewBot = async (body: postBot): Promise<WebResponse<BotApi>> => {
  const response = await axiosInstance.post(`/api-backend/api/bot`, body);
  return response.data;
};

export const getBots = async (query: GetModelbot): Promise<WebResponse<Bot[]>> => {
  const response = await axiosInstance.get(`/api-backend/api/bot`, {
    params: query,
  });
  return response.data;
};

export const getAdminBots = async (query: GetModelbot): Promise<WebResponse<Bot[]>> => {
  const response = await axiosInstance.get(`/api-backend/api/admin/bot`, {
    params: query,
  });
  return response.data;
};

export const getBotById = async (id: string): Promise<WebResponse<Bot>> => {
  const response = await axiosInstance.get(`/api-backend/api/bot/${id}`);
  return response.data;
};

export const editBot = async (id: string, body: changeBot): Promise<WebResponse<BotApi>> => {
  const response = await axiosInstance.patch(`/api-backend/api/bot/${id}`, body);
  return response.data;
};

export const deleteBot = async (id: string): Promise<WebResponse<BotApi>> => {
  const response = await axiosInstance.delete(`/api-backend/api/bot/${id}`);
  return response.data;
};
