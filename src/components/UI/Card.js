import React from "react";
import styles from "./Card.module.css";
function Card(props) {
  return (
    <div className={styles.background}>
      <div className={styles.card}>{props.children}</div>
    </div>
  );
}

export default Card;
