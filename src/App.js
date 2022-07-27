import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import LoadingSpinner from "./components/LoadingSpinner";
import Survey from "./components/Survey";

function App({ docElement }) {
  const [questions, setQuestions] = useState([]);
  const [userId, setUserId] = useState(null);
  const [submited, setSubmited] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const company = docElement.getAttribute("data-company").toLowerCase().trim();
  const answers = [];
  const [numberOfUsers, setNumberOfUsers] = useState(null);

  const getData = async () => {
    await Promise.all([
      fetch("http://localhost/api/v1/companies", { method: "get" })
        .then((res) => res.json())
        .then((data) => {
          const comp = data.find((comp) => {
            return comp.name === company;
          });
          if (!comp) {
            setError(true);
            setFormMessage(
              "The company name you used doesn't exist in our services"
            );
            return;
          }
          setQuestions(comp.questions);
        })
        .catch((err) => {
          setError(true);
          setFormMessage("error! please try again later.");
          console.log(err);
        }),
      await fetch("http://localhost/api/v1/superusers", { method: "get" })
        .then((res) => res.json())
        .then((data) => {
          const numberOfUsers = data.filter((users) => {
            return users.company === company;
          }).length;
          setNumberOfUsers(numberOfUsers);
          setLoading(false);
        })
        .catch((err) => {
          setError(true);
          setFormMessage("error! please try again later.");
          console.log(err);
        }),
    ]);
    setLoading(false);
  };

  const addAnswer = (answer) => {
    setLoading(true);
    answers.push(answer);
    return fetch(`http://localhost/api/v1/superuser/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answers: answers,
      }),
    }).then((res) => {
      setLoading(false);
      return res.json();
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const ValidateEmail = (email) => {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.match(validRegex);
  };
  const validatePhoneNumber = (number) => {
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return re.test(number);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const firstName = document
      .querySelector(".superuser_firstname")
      .value.toLowerCase()
      .trim();
    const lastName = document
      .querySelector(".superuser_lastname")
      .value.toLowerCase()
      .trim();
    const email = document
      .querySelector(".superuser_email_input")
      .value.toLowerCase()
      .trim();
    const number = document
      .querySelector(".superuser_number_input")
      .value.trim();
    if (!firstName || !lastName || !email || !number) {
      setLoading(false);
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
      setLoading(false);
      document
        .querySelector(".superuser_email_input")
        .classList.add("superuser_form_error");
      setFormMessage("invalid email format");
      return false;
    } else if (!validatePhoneNumber(number)) {
      setLoading(false);
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
        firstName,
        lastName,
        email,
        number,
        company,
        answers: [],
      }),
    };

    fetch("http://localhost/api/v1/superusers", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.message) {
          console.log(data.message);
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
        setLoading(false);
        console.log("error", err);
        setFormMessage("ERROR! Please Try Again later.");
      });
  };
  return (
    <div className="App">
      {!submited ? (
        !loading ? (
          <Form
            numberOfUsers={numberOfUsers}
            error={error}
            submitHandler={onSubmitHandler}
            formMessage={formMessage}
            setFormMessage={setFormMessage}
          />
        ) : (
          <LoadingSpinner />
        )
      ) : (
        <Survey
          questions={questions}
          addAnswer={addAnswer}
          loading={loading}
          setLoading={setLoading}
        />
      )}
    </div>
  );
}

export default App;
