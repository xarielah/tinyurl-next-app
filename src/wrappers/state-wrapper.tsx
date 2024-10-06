"use client";

import * as authService from "@/services/auth.service";
import { createContext, useEffect, useState } from "react";

interface IStateWrapper {
  children?: React.ReactNode;
}

export interface IAppContext {
  user: authService.SessionUser | undefined | null;
  setUser: (user: authService.SessionUser) => void;
  removeUser: () => void;
}

const dummyFn = () => {};

export const AppState = createContext<IAppContext>({
  user: undefined,
  setUser: dummyFn,
  removeUser: dummyFn,
});

export default function StateWrapper({ children }: IStateWrapper) {
  const [sessionUser, setSessionUser] = useState<
    authService.SessionUser | null | undefined
  >(undefined);

  useEffect(() => {
    authService
      .sessionInteral()
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const setUser = (user: authService.SessionUser | null) =>
    setSessionUser(user);
  const removeUser = () => setSessionUser(undefined);

  const value = {
    user: sessionUser,
    setUser,
    removeUser,
  };

  return <AppState.Provider value={value}>{children}</AppState.Provider>;
}

export type Session = {
  user: authService.SessionUser | undefined | null;
  setUser: (user: any) => void;
  removeUser: () => void;
};
