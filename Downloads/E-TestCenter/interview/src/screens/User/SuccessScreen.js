import React, { useEffect } from "react";
import Navigation from "../../components/Navigation";
import styles from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getTestscore } from "../../redux/actions/testscoreAction";
import { Alert, AlertIcon} from "@chakra-ui/react";


const SuccessScreen = () => {
  const dispatch = useDispatch();

  const Myscore = useSelector((state) => state.Myscore);
  const { testscore, error,loading } = Myscore;
  const score = testscore;
  
  useEffect(() => {
    dispatch(getTestscore());
  }, [dispatch]);
  return (
    <div>
      <Navigation />
      <div className={styles.pagePadding}>
      {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        {loading ? (<div>
          fetching scores....
        </div>) : (
           <div className={`${styles.center} ${styles.justifyCenter}`}>
           <h1>You have completed your exam</h1>
           <br/>
           <h1 className={styles.scores}><h1>{score}%</h1></h1>
           {score < 50 ? (<div className={styles.imgContainer}><img
             src="https://thumbs.dreamstime.com/z/failed-exam-bad-test-results-vector-illustration-flat-cartoon-unhappy-pupil-student-stressed-woman-girl-not-passed-examination-157082096.jpg"
             alt="happy"
           /></div>) : (<div className={styles.imgContainer}><img
             src="https://img.freepik.com/free-vector/men-success-laptop-relieve-work-from-home-computer-great_10045-646.jpg?size=338&ext=jpg"
             alt="happy"
           /></div>)}
         </div>
        )}
       
      </div>
    </div>
  );
};

export default SuccessScreen;
