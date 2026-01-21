import React from "react";
import styles from "./Call.module.css"

const Call = () => {
  return (
    <div className={styles.callNow}>
      <button>
        <a href="tel:+17727421283">772-742-1283</a>
      </button>
    </div>
  );
};

export default Call;
