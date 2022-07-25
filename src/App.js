import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Survey from "./components/Survey";

function App({ docElement }) {
  const company = docElement.getAttribute("data-company").toLowerCase();
  const [questions, setQuestions] = useState([]);
  const answers = [];
  const [userId, setUserId] = useState(null);
  const addAnswer = (answer) => {
    answers.push(answer);
    return fetch(`http://localhost/api/v1/superuser/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answers: answers,
      }),
    }).then((response) => response.json());
  };
  useEffect(() => {
    fetch("http://localhost/api/v1/companies", { method: "get" })
      .then((res) => res.json())
      .then((data) => {
        const comp = data.find((comp) => {
          return comp.name === company;
        });
        if (!comp)
          return alert("the company you specified does not use our service");
        setQuestions(comp.questions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [submited, setSubmited] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  const ValidateEmail = (email) => {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(validRegex)) return true;

    return false;
  };
  function validatePhoneNumber(number) {
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return re.test(number);
  }
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const firstName = document.querySelector(".superuser_firstname").value;
    const lastName = document.querySelector(".superuser_lastname").value;
    const email = document.querySelector(".superuser_email_input").value;
    const number = document.querySelector(".superuser_number_input").value;
    if (!firstName || !lastName || !email || !number) {
      if (!firstName) {
        document
          .querySelector(".superuser_firstname")
          .classList.add("superuser_form_error");
      }
      if (!lastName) {
        document
          .querySelector(".superuser_lastname")
          .classList.add("superuser_form_error");
      }
      if (!email) {
        document
          .querySelector(".superuser_email_input")
          .classList.add("superuser_form_error");
      }
      if (!number) {
        document
          .querySelector(".superuser_number_input")
          .classList.add("superuser_form_error");
      }

      setFormMessage("Some Fields are incomplete");
      return false;
    } else if (!ValidateEmail(email)) {
      document
        .querySelector(".superuser_email_input")
        .classList.add("superuser_form_error");
      setFormMessage("invalid email format");
      return false;
    } else if (!validatePhoneNumber(number)) {
      document
        .querySelector(".superuser_number_input")
        .classList.add("superuser_form_error");
      setFormMessage("invalid phone number");
      return false;
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName.toLowerCase().trim(),
        lastName: lastName.toLowerCase().trim(),
        email: email.toLowerCase().trim(),
        number: number.trim(),
        company: company.toLowerCase().trim(),
        answers: [],
      }),
    };

    fetch("http://localhost/api/v1/superusers", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          if (data.message.keyPattern.email) {
            setFormMessage("email already in use");
            return;
          } else {
            setFormMessage("number already in use");
            return;
          }
        }
        setUserId(data._id);
        setSubmited(true);
      })
      .catch((err) => {
        console.log("error", err);
        setFormMessage("ERROR! Please Try Again later.");
      });
  };
  return (
    <div className="App">
      {!submited ? (
        <Form
          submitHandler={onSubmitHandler}
          formMessage={formMessage}
          setFormMessage={setFormMessage}
        />
      ) : (
        <Survey questions={questions} addAnswer={addAnswer} />
      )}
    </div>
  );
}

export default App;
