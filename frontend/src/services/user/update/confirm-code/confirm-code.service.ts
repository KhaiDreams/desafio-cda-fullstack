import axios, { AxiosResponse } from "axios";
import {
  UpdateUserConfirmApiReq,
  UpdateUserConfirmApiResponse,
} from "./types/confirm-code.service";
import config from "../../../../config/config";

async function UpdateUserConfirmApi(
  code: string
): Promise<UpdateUserConfirmApiResponse> {
  const api = config.API;

  try {
    const response: AxiosResponse<UpdateUserConfirmApiReq | null> =
      await axios.get(`${api}/user/update?code=${code}`, {
        withCredentials: true,
      });

    if (response.status === 200 && response.data) {
      return {
        data: {
          message: response.data.message || "Usuario atualizado.",
          email: response.data.email,
          username: response.data.username,
          fullname: response.data.fullname,
          avatar: response.data.avatar,
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
export { UpdateUserConfirmApi };
