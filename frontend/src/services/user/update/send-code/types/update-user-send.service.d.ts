export interface UpdateUserSendApiReq {
  message: string;
}
export interface UpdateUserSendApiResponse {
  data: UpdateUserSendApiReq | null;
  error: string | null;
  status: number;
}

export interface UpdateUserSendApiProps {
  fullname?: string;
  username?: string;
  email?: string;
  avatar?: string;
  password?: string;
}
