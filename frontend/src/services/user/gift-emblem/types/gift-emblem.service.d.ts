import { EmblemI } from "../../../../entities/user.entites";

export interface GiftEmblemApiReq {
  message: string | null;
  emblem: EmblemI | null;
}

export interface GiftEmblemApiResponse {
  data: GiftEmblemApiReq | null;
  error: string | null;
  status: number;
}
