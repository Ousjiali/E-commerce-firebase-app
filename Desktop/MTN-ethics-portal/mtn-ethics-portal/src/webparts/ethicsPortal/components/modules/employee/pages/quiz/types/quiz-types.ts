export type QuizResponseType = {
  id: string | number;
  question: string;
  answer: string;
  responseTime: string;
  isCorrect: boolean;
  point: number;
};

export interface QuizInfo {
  title: string;
  duration: number;
  topic: string;
  startDate: string;
  endDate: string;
  area: string;
  instruction: string;
}
