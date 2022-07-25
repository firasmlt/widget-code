import React from "react";
import Card from "./UI/Card";

function Form({ submitHandler, formMessage, setFormMessage }) {
  const onChangeHandler = (e) => {
    if (e.target.value.trim() !== "") {
      setFormMessage("");
      e.target.classList.remove("superuser_form_error");
    } else {
      e.target.classList.add("superuser_form_error");
    }
  };

  return (
    <Card>
      <div>
        <h1 className="superuser_title">Sign Up</h1>
        <p className="superuser_description">
          Sign Up Now To Become a SuperUser
          <p className="superuser_error_message">{formMessage}</p>
        </p>
      </div>

      <form onSubmit={submitHandler} className="superuser_form">
        <div className="superuser_name">
          <input
            onChange={onChangeHandler}
            type="text"
            placeholder="First Name"
            className="superuser_input superuser_name_input superuser_firstname"
          />
          <input
            onChange={onChangeHandler}
            type="text"
            placeholder="Last Name"
            className="superuser_input superuser_name_input superuser_lastname"
          />
        </div>
        <input
          onChange={onChangeHandler}
          type="text"
          placeholder="Email address"
          className="superuser_input superuser_email_input"
        />
        <input
          onChange={onChangeHandler}
          type="text"
          placeholder="Phone number (xxx)xxx-xxxx "
          className="superuser_input superuser_number_input"
        />
        <input type="submit" value="Submit" className="superuser_submit" />
      </form>
    </Card>
  );
}

export default Form;
