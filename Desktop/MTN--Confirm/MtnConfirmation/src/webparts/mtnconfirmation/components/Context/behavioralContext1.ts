import * as React from "react";

export type BehavioralContext1Type = {
 dependabilityRating: number;
  setDependabilityRating: React.Dispatch<React.SetStateAction<number>>;
  dependabilityComment: string;
  setDependabilityComment: React.Dispatch<React.SetStateAction<string>>;
  coperationRating: number;
  setCoperationRating: React.Dispatch<React.SetStateAction<number>>;
  coperationComment: string;
  setCoperationComment: React.Dispatch<React.SetStateAction<string>>;
  initiativeRating: number;
  setInitiativeRating: React.Dispatch<React.SetStateAction<number>>;
  initiativeComment: string;
  setInitiativeComment: React.Dispatch<React.SetStateAction<string>>; 
  
};

export const BehavioralContext1 =
  React.createContext<BehavioralContext1Type | null>(null);