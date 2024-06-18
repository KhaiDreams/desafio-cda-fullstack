import axios, { AxiosResponse } from "axios";
import {
  GiftEmblemApiReq,
  GiftEmblemApiResponse,
} from "./types/gift-emblem.service";
import config from "../../../config/config";

async function GiftEmblemApi(): Promise<GiftEmblemApiResponse> {
    const api = config.API;

  try {
    const response: AxiosResponse<GiftEmblemApiReq | null> = await axios.get(
      `${api}/user/gift`,
      {
        withCredentials: true,
      }
    );

    if (response.status === 200 && response?.data) {
      return {
        data: {
          message: null,
          emblem: response.data.emblem,
        },
        error: null,
        status: response.status,
      };
    } else {
      return {
        data: null,
        error: response?.data?.message || "Erro desconhecido.",
        status: response.status,
      };
    }
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data?.msg || "Erro desconhecido.",
      status: error.response?.status || 500,
    };
  }
}
export { GiftEmblemApi };
