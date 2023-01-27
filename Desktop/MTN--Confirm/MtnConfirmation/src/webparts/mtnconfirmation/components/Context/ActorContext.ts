import * as React from "react";

export type ActorContextType = {
  actor: string;
  setActor: React.Dispatch<React.SetStateAction<string>>;
};

export const ActorContext = React.createContext<ActorContextType | null>(null);
