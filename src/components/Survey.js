import React, { useEffect, useState } from "react";
import LoadingSpinner from "./UI/LoadingSpinner";
import Question from "./Question";
import Card from "./UI/Card";

function Survey({ questions, addAnswer, loading, setLoading }) {
  const [finished, setFinished] = useState(false);
  const [message, setMessage] = useState(
    "Thank you for completing the survey, we'll reach out soon."
  );

  if (questions.length === 0) {
    setFinished(true);
  }
  const [index, setIndex] = useState(0);

  const answeredHandler = (answer) => {
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
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <Card>
      {loading ? (
        <LoadingSpinner />
      ) : !finished ? (
        <Question
          answeredHandler={answeredHandler}
          text={questions[index]}
          totalNumber={questions.length}
          currentNumber={index + 1}
          setLoading={setLoading}
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
