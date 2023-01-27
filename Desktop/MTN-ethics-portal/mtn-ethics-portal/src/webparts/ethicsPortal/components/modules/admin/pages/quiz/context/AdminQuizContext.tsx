import {
  AdminQuizCreateType,
  QuizQuestion,
} from "../types/admin-quiz-create-type";
import * as React from "react";
import { useToasts } from "react-toast-notifications";
import { errorAlert, successAlert } from "../../../../../utils/toast-messages";
import { sp } from "@pnp/sp";
import { QuizTopic } from "../screens/QuizTopic";
import { QuizMetaData } from "../screens/QuizMetaData";
import { QuizQuestionSetUp } from "../screens/QuizQuestion";
import { useHistory } from "react-router-dom";
import uuid from "react-uuid";

type QuizContextType = {
  quiz: AdminQuizCreateType;
  setQuiz: React.Dispatch<React.SetStateAction<AdminQuizCreateType>>;
  steps: any[];
  isStepOptional: (step: number) => boolean;
  isStepSkipped: (step: number) => boolean;
  submitHandler: () => Promise<void>;
  skipped: Set<number>;
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  handleSkip: () => void;
  handleReset: () => void;
  getStepContent: (step: number) => React.ReactNode;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  loading: boolean;
  isUpdating: boolean;
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
  updateHandler: (id: number) => void;
};

const CreateAdminQuizContext = React.createContext<QuizContextType | null>(
  null
);

export const CreateAdminQuizContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [quiz, setQuiz] = React.useState<AdminQuizCreateType>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [questions, setQuestions] = React.useState<QuizQuestion[]>([]);
  const [isUpdating, setIsUpdating] = React.useState<boolean>(false);
  const history = useHistory();
  const steps = getSteps();

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const toast = useToasts().addToast;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;

    setQuiz({
      ...quiz,
      [name as keyof AdminQuizCreateType]: value,
    });
  };

  const submitHandler = async () => {
    setLoading(true);
    try {
      await sp.web.lists.getByTitle("QuizQuestions").items.add({
        questions: JSON.stringify(quiz?.questions),
        duration: quiz?.duration,
        startDate: new Date(quiz?.startDate),
        endDate: new Date(quiz?.endDate),
        QuizTitle: quiz?.title,
        instruction: quiz?.instruction,
        topic: quiz?.topic,
        area: quiz?.area,
        QuizId: quiz?.QuizId,
        Shuffled: quiz?.isShuffle,
      });
      setLoading(false);
      successAlert(toast, "Quiz Created Successfully").then(() => {
        history.push("/admin/manage-quiz");
      });
    } catch (e) {
      errorAlert(toast);
      setLoading(false);
    }
  };
  const updateHandler = async (id: number) => {
    setLoading(true);
    try {
      await sp.web.lists
        .getByTitle("QuizQuestions")
        .items.getById(id)
        .update({
          questions: JSON.stringify(quiz?.questions),
          duration: quiz?.duration,
          startDate: new Date(quiz?.startDate),
          endDate: new Date(quiz?.endDate),
          QuizTitle: quiz?.title,
          instruction: quiz?.instruction,
          topic: quiz?.topic,
          area: quiz?.area,
          QuizId: quiz?.QuizId,
          Shuffled: quiz?.isShuffle,
        });
      setLoading(false);
      successAlert(toast, "Quiz Updated Successfully").then(() => {
        history.push("/admin/manage-quiz");
      });
    } catch (e) {
      setLoading(false);
      errorAlert(toast);
    }
  };

  return (
    <CreateAdminQuizContext.Provider
      value={{
        quiz,
        setQuiz,
        activeStep,
        handleBack,
        handleNext,
        handleSkip,
        isStepOptional,
        skipped,
        steps,
        getStepContent,
        isStepSkipped,
        handleReset,
        handleChange,
        submitHandler,
        loading,
        isUpdating,
        updateHandler,
        setIsUpdating,
      }}
    >
      {children}
    </CreateAdminQuizContext.Provider>
  );
};

export const CreateAdminQuizContextData = () => {
  const data = React.useContext(CreateAdminQuizContext);

  return {
    ...data,
  };
};

function getSteps() {
  return ["Quiz Topic", "Quiz Information", "Quiz Questions"];
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <QuizTopic />;
    case 1:
      return <QuizMetaData />;
    case 2:
      return <QuizQuestionSetUp />;
    default:
      return <></>;
  }
}
