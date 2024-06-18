import axios, { AxiosResponse } from "axios";
import {
  LogoutApiReq,
  LogoutApiResponse,
} from "../logout/types/logout.service";
import config from "../../config/config";

async function LogoutApi(): Promise<LogoutApiResponse> {
  const api = config.API;

  try {
    const response: AxiosResponse<LogoutApiReq | null> = await axios.get(
      `${api}/login/logout`,
      { withCredentials: true }
    );

    if (response.status === 200 && response.data) {
      return {
        data: {
          message: response.data.message,
        },
        error: null,
        status: response.status,
      };
    } else {
      return {
        data: {
          message: response?.data?.message || "Unknown error.",
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
      },
      error: error.response?.data?.msg || "Unknown error.",
      status: error.response?.status || 500,
    };
  }
}
export { LogoutApi };
