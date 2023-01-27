import * as React from "react";

export type BehavioralContextType = {
  attendanceRating: number;
  setAttendanceRating: React.Dispatch<React.SetStateAction<number>>;
  attendanceComment: string;
  setAttendanceComment: React.Dispatch<React.SetStateAction<string>>;
  adaptRating: number;
  setAdaptRating: React.Dispatch<React.SetStateAction<number>>;
  adaptComment: string;
  setAdaptComment: React.Dispatch<React.SetStateAction<string>>;
  judgementRating: number;
  setJudgementRating: React.Dispatch<React.SetStateAction<number>>;
  judgementComment: string;
  setJudgementComment: React.Dispatch<React.SetStateAction<string>>;
  punctualityRating: number;
  setPunctualityRating: React.Dispatch<React.SetStateAction<number>>;
  punctualityComment: string;
  setPunctualityComment: React.Dispatch<React.SetStateAction<string>>;
  behavioralEvaluationScore: number;
  setBehavioralEvaluationScore: React.Dispatch<React.SetStateAction<number>>;
  queryComment: string;
  setQueryComment: React.Dispatch<React.SetStateAction<string>>;
  queryRating: string;
  setQueryRating: React.Dispatch<React.SetStateAction<string>>;
  disciplinaryRating: string;
  setDisciplinaryRating: React.Dispatch<React.SetStateAction<string>>;
  disciplinaryComment: string;
  setDisciplinaryComment: React.Dispatch<React.SetStateAction<string>>;
};

export const BehavioralContext =
  React.createContext<BehavioralContextType | null>(null);
