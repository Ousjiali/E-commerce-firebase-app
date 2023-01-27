import * as React from "react";

export type SupervisoryEvaluationContextType = {
  leadershipRating: number;
  setLeadershipRating: React.Dispatch<React.SetStateAction<number>>;
  leadershipComment: string;
  setLeadershipComment: React.Dispatch<React.SetStateAction<string>>;
  communicationRating: number;
  setCommunicationRating: React.Dispatch<React.SetStateAction<number>>;
  communicationComment: string;
  setCommunicationComment: React.Dispatch<React.SetStateAction<string>>;
  delegationRating: number;
  setDelegationRating: React.Dispatch<React.SetStateAction<number>>;
  delegationComment: string;
  setDelegationComment: React.Dispatch<React.SetStateAction<string>>;
  administrationRating: number;
  setAdministrationRating: React.Dispatch<React.SetStateAction<number>>;
  administrationComment: string;
  setAdministrationComment: React.Dispatch<React.SetStateAction<string>>;
  planningRating: number;
  setPlanningRating: React.Dispatch<React.SetStateAction<number>>;
  planningComment: string;
  setPlanningComment: React.Dispatch<React.SetStateAction<string>>;
  peopleManagementRating: number;
  setPeopleManagementRating: React.Dispatch<React.SetStateAction<number>>;
  peopleManagementComment: string;
  setPeopleManagementComment: React.Dispatch<React.SetStateAction<string>>;
  supervisoryEvaluationScore: number;
  setSupervisoryEvaluationScore: React.Dispatch<React.SetStateAction<number>>;
};

export const SupervisoryEvaluationContext =
  React.createContext<SupervisoryEvaluationContextType | null>(null);
