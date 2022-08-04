import React, { useState, useRef } from "react";
import Card from "./UI/Card";
import Waitlist from "./Waitlist";
import styles from "./Form.module.css";
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
  const [userType, setUserType] = useState("");
  const onChangeHandler = (e) => {
    if (e.target.value.trim() !== "") {
      setFormMessage("");
      e.target.classList.remove("superuser_form_error");
    } else {
      e.target.classList.add("superuser_form_error");
    }
  };

  const typeChangeHandler = (e) => {
    setUserType(e.target.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    submitHandler(
      firstNameInputRef.current,
      lastNameInputRef.current,
      emailInputRef.current,
      numberInputRef.current,
      userType
    );
  };

  return (
    <Card>
      {!error ? (
        <>
          <div>
            <h1 className={styles.title}>Sign Up</h1>
            <p className={styles.description}>
              Sign Up Now To Become a Superuser
              <Waitlist numberOfUsers={numberOfUsers} />
              <p className={styles.error_message}>{formMessage}</p>
            </p>
          </div>
          <form onSubmit={onSubmitHandler} className={styles.form}>
            <div className={styles.name}>
              <input
                onChange={onChangeHandler}
                type="text"
                placeholder="First Name"
                className={`${styles.input} ${styles.name_input} ${styles.firstname}`}
                ref={firstNameInputRef}
              />
              <input
                onChange={onChangeHandler}
                type="text"
                placeholder="Last Name"
                className={`${styles.input} ${styles.name_input} ${styles.lastname}`}
                ref={lastNameInputRef}
              />
            </div>
            <input
              onChange={onChangeHandler}
              type="text"
              placeholder="Email address"
              className={`${styles.input} ${styles.email_input}`}
              ref={emailInputRef}
            />
            <input
              onChange={onChangeHandler}
              type="text"
              placeholder="Phone number (xxx)xxx-xxxx "
              className={`${styles.input} ${styles.number_input}`}
              ref={numberInputRef}
            />
            <div className="superuser_wrapper">
              <input
                type="radio"
                name="userType"
                value={"superuser"}
                id="option-1"
                onClick={typeChangeHandler}
              />
              <input
                type="radio"
                name="userType"
                value={"normaluser"}
                id="option-2"
                onClick={typeChangeHandler}
              />
              <label htmlFor="option-1" className="option option-1">
                <div className="dot"></div>
                <span>Superuser</span>
              </label>
              <label htmlFor="option-2" className="option option-2">
                <div className="dot"></div>
                <span>Normal User</span>
              </label>
            </div>
            <input type="submit" value="Submit" className={styles.submit} />
          </form>
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
            <div className="signup_message">
              <a href="#">sign up</a>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

export default Form;
