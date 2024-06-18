export interface UpdateUserCancelApiReq {
  message: string;
}
export interface UpdateUserCancelApiResponse {
  data: UpdateUserCancelApiReq | null;
  error: string | null;
  status: number;
}
