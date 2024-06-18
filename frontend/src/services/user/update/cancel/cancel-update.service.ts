import axios, { AxiosResponse } from "axios";
import { UpdateUserCancelApiReq, UpdateUserCancelApiResponse } from "./types/cancel-update.service";
import config from "../../../../config/config";

async function UpdateUserCancelApi(): Promise<UpdateUserCancelApiResponse> {
  const api = config.API;

  try {
    const response: AxiosResponse<UpdateUserCancelApiReq | null> =
      await axios.get(`${api}/user/update/cancel`, {
        withCredentials: true,
      });

    if (response.status === 200 && response?.data?.message) {
      return {
        data: {
          message: response.data.message,
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
export { UpdateUserCancelApi };
