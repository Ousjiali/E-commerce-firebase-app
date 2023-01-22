import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation";
import AccountHeader from "../../components/UI/AccountHeader";
import { getTestTime } from "../../redux/actions/testscoreAction";
import { useHistory } from "react-router-dom";
import styles from "./styles.module.css";
const Training = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const myDetail = JSON.parse(localStorage.getItem("candidateDetail"));
  const user = myDetail;
  console.log(user);

  const training = JSON.parse(localStorage.getItem("test_training"));
  console.log(training);
  const videoUrl = training && training.videoUrl
  console.log(videoUrl)

  
  const clickHandler = () => {
    dispatch(getTestTime());
    setTimeout(() => history.push("/test"), [500]);
  };

  return (
    <div>
      <Navigation />
      <div className={styles.training}>
        <div className={styles.vcenter}>
          <iframe
            src={`https://www.youtube.com/embed/${videoUrl}`}
            frameborder="0"
            allow="autoplay; encrypted-media"
            width="80%"
            height="460"
            allowfullscreen="allowfullscreen"
            title="video"
          />
        </div>
      </div>
      <div className={styles.description}>
          <div className={styles.about}>
              <h1>About this training</h1>
              <div className={styles.examBtn}>Test your knowlegde &nbsp; <Link to="/start" className="btn gold" onClick={clickHandler}>
          Start Test
        </Link>
        </div>
          </div>
          <p>275+ top-quality practice test questions for Toyota exam | Detailed explanations and references | </p>
          <div className={styles.training_info}>
              <div className={styles.info_title}>Description:</div>
              <div className={styles.info}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.</div>
          </div>
          <div className={styles.training_info}>
              <div className={styles.info_title}>Skill Level:</div>
              <div className={styles.info}>Intermediate</div>
          </div>
          <div className={styles.training_info}>
              <div className={styles.info_title}>Last Updated:</div>
              <div className={styles.info}> There are many versions of this training <br/>22nd APR, 2022 | </div>
          </div>
      </div>
      <div className={styles.footer}>
        
      </div>
    </div>
  );
};

export default Training;
