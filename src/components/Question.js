import React, { useRef, useState } from "react";

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
      className="superuser_question_form"
    >
      <label className="superuser_question">
        {text.toLowerCase().replace(/\?/g, "")}?
      </label>
      <textarea
        className="superuser_answer"
        placeholder="Write your answer here"
        ref={answerRef}
      ></textarea>
      <p className="superuser_error_message">{message}</p>
      <input type="submit" value="submit" className="superuser_submit" />
      <div className="superuser_progress">{`${currentNumber}/${totalNumber}`}</div>
    </form>
  );
}

export default Question;
