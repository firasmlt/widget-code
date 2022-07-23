import { useState } from "react";
import "./App.css";
import Form from "./Form";
import Survey from "./Survey";

function App({ docElement }) {
  const company = docElement.getAttribute("data-company");
  const fetchedData = [
    "what do you think this product does",
    "are you ready to use it",
    "fuck you",
  ];
  const [submited, setSubmited] = useState(false);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const firstName = document.querySelector(".superuser_firstname").value;
    const lastName = document.querySelector(".superuser_lastname").value;
    const email = document.querySelector(".superuser_email_input").value;
    const number = document.querySelector(".superuser_number_input").value;
    console.log(
      `hello mr ${firstName} ${lastName}. email : ${email} number: ${number}`
    );

    setSubmited(true);
  };
  return (
    <div className="App">
      {!submited ? (
        <Form submitHandler={onSubmitHandler} />
      ) : (
        <Survey questions={fetchedData} />
      )}
    </div>
  );
}

export default App;
