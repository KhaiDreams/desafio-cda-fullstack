import { EmblemI } from "./emblem.entitie";

export interface UserI {
  id: number;
  email?: string | null;
  username: string | null;
  verified_email: boolean;
  password?: string | null;
  fullname?: string | null;
  avatar: string | null;
  deleted: boolean;
  created_at: Date;
  UserEmblems: UserEmblemI[];
}

export interface UserEmblemI {
  id: number;
  user_id: number;
  user: UserI;
  emblem_id: number;
  emblem: EmblemI;
  created_at: Date;
}
