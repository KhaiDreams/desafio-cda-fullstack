import axios, { AxiosResponse } from "axios";
import {
  RegisterApiProps,
  RegisterApiReq,
  RegisterApiResponse,
} from "../register/types/register.service";
import config from "../../config/config";

async function RegisterApi({
  username,
  email,
  password,
}: RegisterApiProps): Promise<RegisterApiResponse> {
  const api = config.API;

  try {
    const response: AxiosResponse<RegisterApiReq | null> = await axios.post(
      `${api}/register`,
      {
        username,
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    if (response.status === 201 && response.data && response.data.token) {
      return {
        data: {
          message: null,
          token: response.data.token,
        },
        error: null,
        status: response.status,
      };
    } else {
      return {
        data: {
          message: response?.data?.message || "Unknown error.",
          token: null,
        },
        error: response.data
          ? response.data.message || "Unknown error."
          : "Unknown error.",
        status: response.status,
      };
    }
  } catch (error: any) {
    return {
      data: {
        message: error.response?.data?.message || null,
        token: null,
      },
      error: error.response?.data?.msg || "Unknown error.",
      status: error.response?.status || 500,
    };
  }
}
export { RegisterApi };
