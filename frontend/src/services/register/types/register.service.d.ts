export interface RegisterApiReq {
  message: string | null;
  token: string | null;
}
export interface RegisterApiResponse {
  data: RegisterApiReq | null;
  error: string | null;
  status: number;
}

export interface RegisterApiProps {
  username: string;
  email: string;
  password: string;
}
