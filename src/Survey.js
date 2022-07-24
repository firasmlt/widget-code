import React, { useState } from "react";
import Question from "./Question";
import Card from "./UI/Card";

function Survey({ questions, userId, addAnswer }) {
  const [finished, setFinished] = useState(false);
  if (questions.length === 0) {
    setFinished(true);
  }
  const [index, setIndex] = useState(0);

  const answeredHandler = (e) => {
    e.preventDefault();
    const answer = document.querySelector(".superuser_answer");
    addAnswer(answer.value)
      .then((data) => {
        answer.value = "";
        console.log(data);
        if (data.message) {
          return alert("error submitting, try again");
        }
        setIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          if (newIndex === questions.length) {
            setFinished(true);
          }
          return newIndex;
        });
      })
      .catch((err) => console.log("error", err));
  };
  return (
    <Card>
      {!finished ? (
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
          Thank you for completing the survey, we'll reach out soon:)
        </p>
      )}
    </Card>
  );
}

export default Survey;
