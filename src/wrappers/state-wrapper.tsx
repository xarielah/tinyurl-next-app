"use client";

import { createContext, useEffect, useState } from "react";

interface IStateWrapper {
  children?: React.ReactNode;
  user: User | undefined | null;
}

export interface IAppContext {
  user: User | undefined | null;
  setUser: (user: User) => void;
  removeUser: () => void;
}

const dummyFn = () => {};

export const AppState = createContext<IAppContext>({
  user: undefined,
  setUser: dummyFn,
  removeUser: dummyFn,
});

export default function StateWrapper({ children, user }: IStateWrapper) {
  const [sessionUser, setSessionUser] = useState<User | null | undefined>();

  useEffect(() => {
    setUser(user || null);
  }, [user]);

  const setUser = (user: User | null) => setSessionUser(user);
  const removeUser = () => setSessionUser(undefined);

  const value = {
    user: sessionUser,
    setUser,
    removeUser,
  };

  return <AppState.Provider value={value}>{children}</AppState.Provider>;
}

export type User = {
  id: string;
  email: string;
  username: string;
};

export type Session = {
  user: User;
  setUser: (user: any) => void;
  removeUser: () => void;
};
