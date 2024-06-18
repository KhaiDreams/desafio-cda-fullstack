import { RankingI } from "../../../entities/ranking.entitie";
import { UserI } from "../../../entities/user.entites";

export interface ContextUserProps {
  user: UserI | null;
  setUser: React.Dispatch<React.SetStateAction<UserI | null>>;
  ranking: RankingI[] | null;
  setRanking: React.Dispatch<React.SetStateAction<RankingI[] | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
