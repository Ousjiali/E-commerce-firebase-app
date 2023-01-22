import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation";
import styles from "./styles.module.css";

const WelcomeScreen = () => {
  return (
    <div>
      <Navigation />
      <div className={styles.grid}>
        <div className={`${styles.card} ${styles.customPadding}`}>
          <h1>LBAN ELETRONIC INTERVIEW</h1>

          <p>
            Hiring and recruitment are important processes as they aim to bring
            in talented people into an organisation. Employees are the backbone
            of any business helping the company soar new heights by enhancing
            productivity, growth, and success. It, therefore, goes without
            saying that such processes should be planned well and carried out
            with the utmost care in order to deliver effective results and
            derive maximum benefits.
          </p>
          <br />
          <br />
          <div className={styles.center}>
          <Link to="/start" className="btn gold">
            Get Started
          </Link>
          </div>
        </div>
        <div className={`${styles.card} ${styles.center} ${styles.display}`}>
          <img
            src="https://static.vecteezy.com/system/resources/previews/002/779/618/non_2x/concept-of-online-exam-on-internet-woman-sitting-near-online-form-survey-on-laptop-questionnaire-web-learning-electronic-voting-illustration-vector.jpg"
            alt="Exam"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
