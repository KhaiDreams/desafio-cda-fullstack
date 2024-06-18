export interface LoginApiReq {
  message: string |  null;
  token: string |  null
}
export interface LoginApiResponse {
  data: LoginApiReq | null;
  error: string | null;
  status: number;
}

export interface LoginApiProps {
  credential: string;
  password: string;
}
