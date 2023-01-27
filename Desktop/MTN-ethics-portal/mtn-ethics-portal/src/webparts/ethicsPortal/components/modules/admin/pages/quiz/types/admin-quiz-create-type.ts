export interface AdminQuizCreateType {
  topic: string;
  area: string;
  instruction: string;
  startDate: Date;
  endDate: Date;
  title: string;
  duration: number;
  questions: QuizQuestion[];
  ID?: number;
  QuizId?: string;
  isShuffle?: boolean;
}

export interface QuizQuestion {
  type: string;
  options: string[];
  answer: string;
  point?: number;
  question: string;
  id: string;
}
