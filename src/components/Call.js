import React from "react";
import styles from "../app/page.module.css"

const Call = () => {
  return (
    <div>
      <button className={styles.callNow}>
        <a href="tel:+17727421283">772-742-1283</a>
      </button>
    </div>
  );
};

export default Call;
