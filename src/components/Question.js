import React, { useRef, useState } from "react";
import styles from "./Question.module.css";
function Question({ text, answeredHandler, totalNumber, currentNumber }) {
  const [message, setMessage] = useState("");
  const answerRef = useRef();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const answer = answerRef.current.value;
        if (answer.trim().length < 10)
          return setMessage("Your answer must be at least 10 caracters long.");
        setMessage("");
        answeredHandler(answer);
      }}
      className={styles.survey_form}
    >
      <label>{text.toLowerCase().replace(/\?/g, "")}?</label>
      <textarea placeholder="Write your answer here" ref={answerRef}></textarea>
      <p className={styles.survey_error}>{message}</p>
      <input type="submit" value="submit" />
      <div className={styles.progress}>{`${currentNumber}/${totalNumber}`}</div>
    </form>
  );
}

export default Question;
