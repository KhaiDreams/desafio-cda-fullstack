"use client";
import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
  useCallback,
} from "react";

import axios from "axios";
import { ContextUserProps } from "./types/context-user";
import { DecodeUser } from "../../utils/decode/user/decode-user";
import { UserI } from "../../entities/user.entites";
import { RankingI } from "../../entities/ranking.entitie";
import { GetRankingApi } from "../../services/ranking/get-ranking/get-ranking.service";
import config from "../../config/config";

const ContextUser = createContext<ContextUserProps | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserI | null>(null);
  const [ranking, setRanking] = useState<RankingI[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const api = config.API;

  const getRanking = useCallback(async () => {
    try {
      const { data } = await GetRankingApi();
      data?.ranking?.find(
        (rank: any, index) =>
          rank.id === user?.id &&
          setUser((prevState: any) => ({
            ...prevState,
            ranking: index + 1,
          }))
      );

      setRanking(data?.ranking || null);
    } catch (error: any) {}
  }, []);

  useEffect(() => {
    getRanking();
  }, [getRanking]);

  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get(`${api}/login`, {
        withCredentials: true,
      });

      if (res.status === 200 && res?.data?.token) {
        const data = DecodeUser(res.data?.token);
        setUser(data);
        return;
      }
    } catch (error) {}
  }, [api, setUser]);

  useEffect(() => {
    fetchUser();

    getRanking();
  }, [api, fetchUser]);

  useEffect(() => {
    getRanking();
  }, [getRanking]);

  const contextValue: ContextUserProps = {
    user,
    setUser,
    ranking,
    setRanking,
    loading,
    setLoading,
  };

  return (
    <ContextUser.Provider value={contextValue}>{children}</ContextUser.Provider>
  );
};

const useUser = () => {
  const context = useContext(ContextUser);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  const user: UserI | null = context.user;
  const setUser: React.Dispatch<React.SetStateAction<UserI | null>> =
    context.setUser;

  const loading: boolean = context.loading;
  const setLoading: React.Dispatch<React.SetStateAction<boolean>> =
    context.setLoading;

  const ranking: RankingI[] | null = context.ranking;
  const setRanking: React.Dispatch<React.SetStateAction<RankingI[] | null>> =
    context.setRanking;

  return { user, setUser, loading, setLoading, ranking, setRanking };
};

export { ContextUser, UserProvider, useUser };
