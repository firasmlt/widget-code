import React from "react";

function Question({ text, answeredHandler, totalNumber, currentNumber }) {
  return (
    <form onSubmit={answeredHandler} className="superuser_question_form">
      <label className="superuser_question">
        {text.toLowerCase().replace(/\?/g, "")}?
      </label>
      <textarea
        className="superuser_answer"
        placeholder="Write your answer here"
        required
      ></textarea>
      <input type="submit" value="submit" className="superuser_submit" />
      <div className="superuser_progress">{`${currentNumber}/${totalNumber}`}</div>
    </form>
  );
}

export default Question;
