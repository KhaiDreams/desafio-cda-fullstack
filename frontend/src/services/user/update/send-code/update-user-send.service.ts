import axios, { AxiosResponse } from "axios";
import {
  UpdateUserSendApiProps,
  UpdateUserSendApiReq,
  UpdateUserSendApiResponse,
} from "./types/update-user-send.service";
import config from "../../../../config/config";

async function UpdateUserSendApi(
  data: UpdateUserSendApiProps
): Promise<UpdateUserSendApiResponse> {
  const api = config.API;

  try {
    const response: AxiosResponse<UpdateUserSendApiReq | null> =
      await axios.put(
        `${api}/user/update`,
        {
          data,
        },
        {
          withCredentials: true,
        }
      );

    if (response.status === 201 && response.data && response.data) {
      return {
        data: {
          message: response.data.message || "Codigo enviado.",
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
export { UpdateUserSendApi };
