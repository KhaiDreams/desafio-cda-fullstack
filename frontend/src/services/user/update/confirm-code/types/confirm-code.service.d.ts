export interface UpdateUserConfirmApiReq {
  message: string;
  email: string;
  username: string ;
  fullname: string;
  avatar: string;
}
export interface UpdateUserConfirmApiResponse {
  data: UpdateUserConfirmApiReq | null;
  error: string | null;
  status: number;
}