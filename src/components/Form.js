import React from "react";
import Card from "./UI/Card";

function Form({ submitHandler, formMessage }) {
  return (
    <Card>
      <div>
        <h1 className="superuser_title">Sign Up</h1>
        <p className="superuser_description">
          Sign Up now to become a SuperUser
          <p className="superuser_error_message">{formMessage}</p>
        </p>
      </div>

      <form onSubmit={submitHandler} className="superuser_form">
        <div className="superuser_name">
          <input
            type="text"
            placeholder="First Name"
            className="superuser_input superuser_name_input superuser_firstname"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="superuser_input superuser_name_input superuser_lastname"
            required
          />
        </div>
        <input
          type="email"
          placeholder="Email address"
          className="superuser_input superuser_email_input"
          required
        />
        <input
          type="tel"
          pattern="\(\d{3}\)[ ]?\d{3}[-]?\d{4}"
          placeholder="Phone number (xxx)xxx-xxxx "
          className="superuser_input superuser_number_input"
          required
        />
        <input type="submit" value="Submit" className="superuser_submit" />
      </form>
    </Card>
  );
}

export default Form;
