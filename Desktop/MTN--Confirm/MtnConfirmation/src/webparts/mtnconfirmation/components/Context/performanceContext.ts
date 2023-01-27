import * as React from "react";

export type performanceEvaluationContextType = {
    knowlegdeRating: number;
    setKnowlegdeRating: React.Dispatch<React.SetStateAction<number>>;
    knowlegdeComment: string;
    setknowlegdeComment: React.Dispatch<React.SetStateAction<string>>;
    workQualityRating: number;
    setWorkQualityRating: React.Dispatch<React.SetStateAction<number>>;
    workQualityComment: string;
    setWorkQualityComment: React.Dispatch<React.SetStateAction<string>>;
    workQuantityRating: number;
    setworkQuantityRating: React.Dispatch<React.SetStateAction<number>>;
    workQuantityComment: string;
    setworkQuantityComment: React.Dispatch<React.SetStateAction<string>>;
  

    workHabitRating: number;
    setWorkHabitRating: React.Dispatch<React.SetStateAction<number>>;
    workHabitComment: string;
    setWorkHabitComment: React.Dispatch<React.SetStateAction<string>>;
    communicationRating: number;
    setCommunicationRating: React.Dispatch<React.SetStateAction<number>>;
    communicationComment: string;
    setCommunicationComment: React.Dispatch<React.SetStateAction<string>>;
    totalPerformanceScore: number;
    setTotalPerformanceScore: React.Dispatch<React.SetStateAction<number>>;
    
};

export const performanceEvaluationContext =
  React.createContext<performanceEvaluationContextType | null>(null);