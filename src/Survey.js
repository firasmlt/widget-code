import React, { useState } from "react";
import Question from "./Question";
import Card from "./UI/Card";

function Survey({ questions }) {
  const [finished, setFinished] = useState(false);

  const [index, setIndex] = useState(0);
  const answeredHandler = (e) => {
    e.preventDefault();
    setIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex === questions.length) {
        setFinished(true);
      }
      return newIndex;
    });
    const answer = document.querySelector(".superuser_answer");
    console.log(answer.value);
    answer.value = "";
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
