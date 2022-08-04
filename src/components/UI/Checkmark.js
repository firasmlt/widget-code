import React, { useEffect } from "react";
import styles from "./Checkmark.module.css";
const Checkmark = ({ setCheckmarkFinished }) => {
  console.log("hello again");
  useEffect(() => {
    setTimeout(() => {
      setCheckmarkFinished(true);
    }, 2000);
  }, []);
  return (
    <>
      <svg
        className={styles.superuser_checkmark}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
      >
        <circle
          className={styles.superuser_checkmark__circle}
          cx="26"
          cy="26"
          r="25"
          fill="none"
        />
        <path
          className={styles.superuser_checkmark__check}
          fill="none"
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
        />
      </svg>
    </>
  );
};

export default Checkmark;
