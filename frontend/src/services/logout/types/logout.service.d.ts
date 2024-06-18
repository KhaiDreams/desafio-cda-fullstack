export interface LogoutApiReq {
  message: string | null;
}
export interface LogoutApiResponse {
  data: LogoutApiReq | null;
  error: string | null;
  status: number;
}
