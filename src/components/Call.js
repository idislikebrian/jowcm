import React from "react";
import styles from "./Call.module.css"

const Call = () => {
  return (
    <div className={styles.callNow}>
      <button>
        <a href="tel:+16016887433">(601) 688-7433</a>
      </button>
    </div>
  );
};

export default Call;
