export interface GetRankingApiReq {
  message: string | null;
  ranking: RankingI[] | null;
}

export interface RankingI {
  id: number;
  username: string;
  avatar: string;
  points: number;
}

export interface GetRankingApiResponse {
  data: GetRankingApiReq | null;
  error: string | null;
  status: number;
}
