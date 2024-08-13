// components/Spinner.js
import React from 'react';
import styles from "./styles.module.css";

const Spinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export { Spinner };
