import React from "react";
import Card from "./Card";
import styles from "./LoadingSpinner.module.css";
export default function LoadingSpinner() {
  return (
    <Card>
      <div className={styles.loadingSpinner}></div>
    </Card>
  );
}
