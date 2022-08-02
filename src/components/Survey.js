import React, { useEffect, useState } from "react";
import Question from "./Question";
import Card from "./UI/Card";
import Checkmark from "./UI/Checkmark";

function Survey({ questions, addAnswer }) {
  const [finished, setFinished] = useState(false);
  const [message, setMessage] = useState(
    "Thank you for completing the survey, we'll reach out soon."
  );
  const [checkmarkFinished, setCheckmarkFinished] = useState(false);

  if (questions.length === 0) {
    setFinished(true);
  }
  const [index, setIndex] = useState(0);

  useEffect(() => {}, [index]);

  const answeredHandler = (answer) => {
    setCheckmarkFinished(false);
    addAnswer(answer)
      .then((res) => {
        console.log(res);
        if (res.status === "fail") {
          setFinished(true);
          setMessage("ERROR! try again later.");
          return;
        }
        setIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          if (newIndex === questions.length) {
            setFinished(true);
          }
          return newIndex;
        });
        answer = "";
      })
      .catch((err) => {
        setMessage("ERROR! try again later.");
        setFinished(true);
        setCheckmarkFinished(true);
        console.log(err);
      });
  };
  return (
    <Card>
      {!checkmarkFinished ? (
        <Checkmark setCheckmarkFinished={setCheckmarkFinished} />
      ) : !finished ? (
        <Question
          answeredHandler={answeredHandler}
          text={questions[index]}
          totalNumber={questions.length}
          currentNumber={index + 1}
        />
      ) : (
        <p
          style={{
            color: "white",
            fontFamily: "roboto",
            padding: "0px 20px",
            textAlign: "center",
          }}
        >
          {message}
        </p>
      )}
    </Card>
  );
}

export default Survey;
