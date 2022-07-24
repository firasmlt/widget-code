import { useEffect, useState } from "react";
import "./App.css";
import Form from "./Form";
import Survey from "./Survey";

function App({ docElement }) {
  const company = docElement.getAttribute("data-company");
  const [questions, setQuestions] = useState([]);
  const answers = [];
  const [userId, setUserId] = useState(null);
  console.log("app rerendered");
  const addAnswer = (answer) => {
    answers.push(answer);
    console.log(userId);
    return fetch(`http://localhost/superuser/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answers: answers,
      }),
    }).then((response) => response.json());
  };
  useEffect(() => {
    fetch("http://localhost/companies", { method: "get" })
      .then((res) => res.json())
      .then((data) => {
        setQuestions(
          data.find((comp) => {
            return comp.name === company;
          }).questions
        );
      })
      .catch((err) => console.log(err));
  }, []);

  const [submited, setSubmited] = useState(false);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const firstName = document.querySelector(".superuser_firstname").value;
    const lastName = document.querySelector(".superuser_lastname").value;
    const email = document.querySelector(".superuser_email_input").value;
    const number = document.querySelector(".superuser_number_input").value;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        number: number,
        company: company,
        answers: [],
      }),
    };

    fetch("http://localhost/superusers", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          return alert("error submitting, try again");
        }
        setUserId(data._id);
        setSubmited(true);
      })
      .catch((err) => console.log("error", err));
    setSubmited(true);
  };
  return (
    <div className="App">
      {!submited ? (
        <Form submitHandler={onSubmitHandler} />
      ) : (
        <Survey questions={questions} userId={userId} addAnswer={addAnswer} />
      )}
    </div>
  );
}

export default App;
