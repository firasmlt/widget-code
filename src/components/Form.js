import React, { useRef } from "react";
import Card from "./UI/Card";

function Form({
  numberOfUsers,
  error,
  submitHandler,
  formMessage,
  setFormMessage,
}) {
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const numberInputRef = useRef();

  const onChangeHandler = (e) => {
    if (e.target.value.trim() !== "") {
      setFormMessage("");
      e.target.classList.remove("superuser_form_error");
    } else {
      e.target.classList.add("superuser_form_error");
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("hey");
    console.log(firstNameInputRef);
    submitHandler(
      firstNameInputRef.current,
      lastNameInputRef.current,
      emailInputRef.current,
      numberInputRef.current
    );
  };

  return (
    <Card>
      {!error ? (
        <>
          <div>
            <h1 className="superuser_title">Sign Up</h1>
            <p className="superuser_description">
              Sign Up Now To Become a SuperUser
              {numberOfUsers < 2 ? (
                <></>
              ) : (
                <div className="superuser_waitlist">
                  <div className="superuser_waitlist_number">
                    {numberOfUsers}
                  </div>
                  Superusers in waitlist
                </div>
              )}
              <p className="superuser_error_message">{formMessage}</p>
            </p>
          </div>
          <form onSubmit={onSubmitHandler} className="superuser_form">
            <div className="superuser_name">
              <input
                onChange={onChangeHandler}
                type="text"
                placeholder="First Name"
                className="superuser_input superuser_name_input superuser_firstname"
                ref={firstNameInputRef}
              />
              <input
                onChange={onChangeHandler}
                type="text"
                placeholder="Last Name"
                className="superuser_input superuser_name_input superuser_lastname"
                ref={lastNameInputRef}
              />
            </div>
            <input
              onChange={onChangeHandler}
              type="text"
              placeholder="Email address"
              className="superuser_input superuser_email_input"
              ref={emailInputRef}
            />
            <input
              onChange={onChangeHandler}
              type="text"
              placeholder="Phone number (xxx)xxx-xxxx "
              className="superuser_input superuser_number_input"
              ref={numberInputRef}
            />
            <input type="submit" value="Submit" className="superuser_submit" />
          </form>{" "}
        </>
      ) : (
        <div>
          <h1 className="superuser_title">ERROR!</h1>
          <p className="superuser_description superuser_error_message">
            {formMessage}
          </p>
          {formMessage.toLowerCase() === "error! please try again later." ? (
            <></>
          ) : (
            <div className="superuser_signup_message">
              <a href="#">sign up</a>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

export default Form;
