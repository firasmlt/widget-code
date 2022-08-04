import React from "react";
import styles from "./Waitlist.module.css";
const Waitlist = ({ numberOfUsers }) => {
  return (
    <>
      {numberOfUsers < 2 ? (
        <></>
      ) : (
        <div className={styles.waitlist}>
          <div className={styles.waitlist_number}>{numberOfUsers}</div>
          Superusers in waitlist
        </div>
      )}
    </>
  );
};

export default Waitlist;
