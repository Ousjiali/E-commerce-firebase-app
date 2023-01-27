import * as React from "react";
import { QuizInfo, QuizResponseType } from "../types/quiz-types";
import { sp } from "@pnp/sp";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import { removeDuplicateObjectFromArray } from "../util";
import { QuizStatus } from "../../../../admin/pages/quiz/modals/EnableQuizPromptModal";
import { errorAlert, successAlert } from "../../../../../utils/toast-messages";

type QuizContextType = {
  responses: QuizResponseType[];
  staffResponses: QuizResponseType[];
  page: number;
  total: number | null;
  points: number | null;
  next: (page: number) => void;
  prev: (page: number) => void;
  showNext: (currentPage: number) => boolean;
  showPrev: (currentPage: number) => boolean;
  showSubmit: (currentPage: number) => boolean;
  setTotal: (item: number) => void;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  setResponses: React.Dispatch<React.SetStateAction<QuizResponseType[]>>;
  setResponse: React.Dispatch<React.SetStateAction<QuizResponseType>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  submitQuiz: (data: any) => Promise<void>;
  staff: any;
  response: QuizResponseType;
  calculateScore: (page: number) => void;
  score: number;
  questions: any[];
  getting: boolean;
  result: Result;
  doneHandler: () => void;
  quizInfo: QuizInfo;
  seconds: number;
  startTimer: () => void;
  expectedScore: number;
  setExpectedScore: React.Dispatch<React.SetStateAction<number>>;
};

const QuizContext = React.createContext<QuizContextType>(null);

type Result = {
  correct: number;
  wrong: number;
  skipped?: number;
};

export const QuizContextProvider = ({ children }) => {
  const [questions, setQuestions] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [expectedScore, setExpectedScore] = React.useState(0);
  const [points, setPoints] = React.useState<number>(0);
  const [responses, setResponses] = React.useState<QuizResponseType[]>([]);
  const [staffResponses, setStaffResponses] = React.useState<
    QuizResponseType[]
  >([]);
  const [response, setResponse] = React.useState<QuizResponseType>();
  const [loading, setLoading] = React.useState(false);
  const [staff, setStaff] = React.useState<any>();
  const [score, setScore] = React.useState(0);
  const [getting, setGetting] = React.useState<boolean>(false);
  const [result, setResult] = React.useState<Result>(null);
  const [quizInfo, setQuizInfo] = React.useState<QuizInfo>();
  const [seconds, setSeconds] = React.useState(60);
  const [QuizId, setQuizId] = React.useState<number>(null);
  const [expected, setExpected] = React.useState<number>(0);
  const [staffScore, setStaffScore] = React.useState(0);

  React.useEffect(() => {
    const score = questions
      .map((question) => question.point)
      .reduce((a, b) => parseInt(a) + parseInt(b), 0);
    setExpected(score);
  }, [questions]);
  React.useEffect(() => {
    const score = responses
      .filter((response) => response?.isCorrect)
      .map((response) => response?.point)
      .reduce((a: any, b: any) => parseInt(a) + parseInt(b), 0);
    setStaffScore(score);
  }, [responses]);

  const toast = useToasts().addToast;

  const history = useHistory();

  React.useEffect(() => {
    setGetting(true);
    sp.web.lists
      .getByTitle("QuizQuestions")
      .items.filter(`status eq '${QuizStatus.Is_Enabled}'`)
      .get()
      .then((items) => {
        setGetting(false);
        if (items.length > 0) {
          const range = generateArrayOfDates(
            items[0].endDate,
            items[0].startDate
          );
          const today = new Date(Date.now()).toISOString();
          if (range.includes(new Date(today).toLocaleDateString())) {
            setQuizInfo({
              area: items[0].area,
              duration: items[0].duration > 0 ? items[0].duration - 1 : 0,
              endDate: items[0].endDate,
              startDate: items[0].startDate,
              instruction: items[0].instruction,
              title: items[0].QuizTitle,
              topic: items[0].topic,
            });
            setQuizId(items[0].ID);

            let q = items[0].questions;
            q = JSON.parse(q);
            if (items[0].Shuffled) {
              setQuestions(q.sort((a, b) => 0.5 - Math.random()));
            } else {
              setQuestions(q);
            }
            setTotal(q?.length);
            setGetting(false);
          } else {
            setQuestions([]);
            setTotal(0);
            setGetting(false);
          }
        } else {
          setQuestions([]);
          setTotal(0);
          setGetting(false);
        }
      })
      .catch((err) => {
        setGetting(false);
      });
  }, []);

  React.useEffect(() => {
    getUser().then((res) => {
      setStaff({
        name: res?.DisplayName,
        email: res?.Email,
      });
    });
  }, []);

  React.useEffect(() => {
    if (seconds > 0) return;
    setQuizInfo({
      ...quizInfo,
      duration: quizInfo?.duration - 1,
    });
  }, [seconds]);

  const next = (page: number) => {
    setPage(page + 1);
  };

  const prev = (page: number) => {
    setPage(page - 1);
  };

  let [nIntervId, setnIntervId] = React.useState(null);

  const startTimer = () => {
    if (!nIntervId) {
      setnIntervId(
        setInterval(() => {
          setSeconds((prev) => prev - 1);
        }, 1000)
      );
    }
  };
  const stopTimer = () => {
    clearInterval(nIntervId);
    nIntervId = null;
  };

  React.useEffect(() => {
    if (quizInfo?.duration === 0 && seconds === 0) {
      setSeconds(0);
      setQuizInfo({
        ...quizInfo,
        duration: 0,
      });
      stopTimer();
      errorAlert(toast, "Quiz Timed Out");
    }

    if (seconds === 0 && quizInfo?.duration > 0) {
      setSeconds(60);
    }
  }, [seconds, nIntervId, quizInfo?.duration]);

  const showNext = (currentPage: number) => {
    return currentPage !== total;
  };
  const showPrev = (currentPage: number) => {
    return currentPage !== 0;
  };
  const showSubmit = (currentPage: number) => {
    return currentPage + 1 === total;
  };

  const getUser = async () => {
    try {
      const user = await sp.profiles.myProperties.get();
      return user;
    } catch (error) {
      return error?.message;
    }
  };

  const calculateScore = (page) => {
    setScore((prev) => prev + 1);
  };

  const submitQuiz = async (data) => {
    if (loading) return;
    setLoading(true);
    let filteredData: QuizResponseType[] = removeDuplicateObjectFromArray(
      data?.responses,
      "answer"
    );

    try {
      const res = await sp.web.lists.getByTitle("QuizResponse").items.add({
        StaffName: staff?.name,
        StaffEmail: staff?.email,
        responses: JSON.stringify(filteredData),
        ["QuizId"]: QuizId,
        duration: `${quizInfo?.duration}m:${seconds}s`,
        ExpectedScore: expected.toString(),
        TotalPoints: staffScore.toString(),
      });

      setLoading(false);
      setQuizInfo(null);

      let userResponses = res.data;
      userResponses = JSON.parse(userResponses.responses);
      setResponses([]);

      setStaffResponses(userResponses);

      filteredData = removeDuplicateObjectFromArray(userResponses, "answer");

      const groupedResponses = filteredData.reduce((prev, curr) => {
        const currCount = prev[`${curr.isCorrect}`] ?? [];
        return {
          ...prev,
          [`${curr.isCorrect}`]: [...currCount, curr],
        };
      }, {});
      let userResult = {
        correct: groupedResponses["true"] ? groupedResponses["true"].length : 0,
        wrong: groupedResponses["false"] ? groupedResponses["false"].length : 0,
      };
      userResult = {
        ...userResult,
        wrong: questions?.length - userResult?.correct,
      };
      setResult({
        ...userResult,
      });

      await sp.web.lists
        .getByTitle("QuizResponse")
        .items.getById(res.data.Id)
        .update({
          score: JSON.stringify({
            ...userResult,
          }),
        });
      history.push("/employee/quiz-result");
      setPage(0);
    } catch (error) {
      setLoading(false);
      toast(`An error occured`, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const doneHandler = () => {
    setPage(0);
    history.push("/employee/quiz/landing");
  };

  return (
    <QuizContext.Provider
      value={{
        next,
        showNext,
        showPrev,
        prev,
        total,
        setTotal,
        responses,
        setResponses,
        page,
        loading,
        submitQuiz,
        showSubmit,
        staff,
        setResponse,
        response,
        setScore,
        calculateScore,
        score,
        questions,
        getting,
        result,
        staffResponses,
        doneHandler,
        quizInfo,
        seconds,
        startTimer,
        points,
        setPoints,
        expectedScore,
        setExpectedScore,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const getQuizContextState = () => {
  const state = React.useContext(QuizContext);

  return {
    ...state,
  };
};

export const enum AnswerStatus {
  Disabled = "disabled",
  Enabled = "enabled",
}

export const generateArrayOfDates = (from, to) => {
  let arr = [];
  let dt = new Date(to);
  from = new Date(from);
  while (dt <= from) {
    arr.push(new Date(dt).toLocaleDateString());
    dt.setDate(dt.getDate() + 1);
  }
  return arr;
};
