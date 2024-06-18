import axios, { AxiosResponse } from "axios";
import {
  GetRankingApiReq,
  GetRankingApiResponse,
} from "./types/get-ranking.service";
import config from "../../../config/config";

export async function GetRankingApi(): Promise<GetRankingApiResponse> {
  const api = config.API;

  try {
    const response: AxiosResponse<GetRankingApiReq | null> = await axios.get(
      `${api}/ranking`,
      {
        withCredentials: true,
      }
    );
    
    if (response.status === 200 && response?.data) {
      return {
        data: {
          message: null,
          ranking: response.data.ranking,
        },
        error: null,
        status: response.status,
      };
    } else {
      return {
        data: null,
        error: response.data
          ? response.data.message || "Erro desconhecido."
          : "Erro desconhecido.",
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
