import React from "react";
import styles from "./Ticker.module.css";

const Ticker = ({ text }) => {
  return (
    <div className={styles.tickerWrapper}>
      <div className={styles.tickerContent}>
        <p>{text}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Ticker;
