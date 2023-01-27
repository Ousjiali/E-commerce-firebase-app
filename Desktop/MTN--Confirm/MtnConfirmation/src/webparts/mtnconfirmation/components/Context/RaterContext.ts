import * as React from "react";

export type RaterContextType = {
  rater: string;
  date: string;
  raterEmail: string;
  raterFinalComments: string;
  setRaterFinalComments: React.Dispatch<React.SetStateAction<string>>;
};

export const RaterContext = React.createContext<RaterContextType | null>(null);
