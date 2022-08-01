import React, { useState } from "react";

function Question({ text, answeredHandler, totalNumber, currentNumber }) {
  const [message, setMessage] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (
          document.querySelector(".superuser_answer").value.trim().length < 10
        )
          return setMessage("Your answer must be at least 10 caracters long.");
        setMessage("");
        answeredHandler(e);
      }}
      className="superuser_question_form"
    >
      <label className="superuser_question">
        {text.toLowerCase().replace(/\?/g, "")}?
      </label>
      <textarea
        className="superuser_answer"
        placeholder="Write your answer here"
      ></textarea>
      <p className="superuser_error_message">{message}</p>
      <input type="submit" value="submit" className="superuser_submit" />
      <div className="superuser_progress">{`${currentNumber}/${totalNumber}`}</div>
    </form>
  );
}

export default Question;
