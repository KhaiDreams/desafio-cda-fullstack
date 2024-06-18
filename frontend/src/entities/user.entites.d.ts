export interface UserI {
  id: number;
  email?: string | null;
  username: string | null;
  verified_email: boolean;
  password?: string | null;
  fullname?: string | null;
  avatar: string;
  points?: number;
  ranking: number | null;
  emblems?: EmblemI[];
  created_at: Date;
}

export interface EmblemI {
  id: number;
  slug: string;
  name: string;
  image: string;
  value: number;
  category: string;
  created_at: Date;
}
