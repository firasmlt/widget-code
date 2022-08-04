import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import Survey from "./components/Survey";
function App({ docElement }) {
  const [questions, setQuestions] = useState([]);
  const [userId, setUserId] = useState(null);
  const [submited, setSubmited] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const company = docElement.getAttribute("data-company").toLowerCase().trim();
  const [numberOfUsers, setNumberOfUsers] = useState(0);

  const getData = async () => {
    await Promise.all([
      fetch("http://localhost/api/v1/companies", { method: "get" })
        .then((res) => res.json())
        .then((res) => {
          const data = res.data;
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
        .then((res) => {
          const data = res.data;
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
    return fetch(`http://localhost/api/v1/superusers/addAnswer/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answer: answer,
      }),
    }).then((res) => {
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
  const onSubmitHandler = async (
    firstName,
    lastName,
    email,
    number,
    userType
  ) => {
    try {
      if (
        !firstName.value.trim() ||
        !lastName.value.trim() ||
        !email.value.trim() ||
        !number.value.trim() ||
        !userType
      ) {
        if (!firstName.value.trim()) {
          firstName.classList.add("superuser_form_error");
        }
        if (!lastName.value.trim()) {
          lastName.classList.add("superuser_form_error");
        }
        if (!email.value.trim()) {
          email.classList.add("superuser_form_error");
        }
        if (!number.value.trim()) {
          number.classList.add("superuser_form_error");
        }

        setFormMessage("Some Fields are incomplete");
        return false;
      } else if (!ValidateEmail(email.value)) {
        email.classList.add("superuser_form_error");
        setFormMessage("invalid email format");
        return false;
      } else if (!validatePhoneNumber(number.value)) {
        number.classList.add("superuser_form_error");
        setFormMessage("invalid phone number");
        return false;
      }
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          number: number.value,
          company,
          userType,
          answers: [],
        }),
      };

      const res = await fetch(
        "http://localhost/api/v1/superusers",
        requestOptions
      );
      const data = await res.json();
      if (data.status === "fail") {
        if (
          data.message === "Superuser validation failed: email: invalid email"
        ) {
          return setFormMessage("invalid email format");
        }
        if (data.message === "Duplicate field value: email") {
          return setFormMessage("email already in use");
        } else if (data.message === "Duplicate field value: number") {
          return setFormMessage("number already in use");
        } else if (data.message === "email: invalid") {
          return setFormMessage("invalid email");
        }
      }
      setUserId(data.data._id);
      setSubmited(true);
    } catch (err) {
      console.log("error", err);
      setFormMessage("ERROR! Please Try Again later.");
    }
  };
  return (
    <>
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
    </>
  );
}

export default App;
