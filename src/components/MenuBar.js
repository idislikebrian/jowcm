import React, { useState, useEffect } from "react";
import styles from "../app/page.module.css";
import Image from "next/image";
import Call from "./Call";

const MenuBar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); 
  };

  return (
    <div className={styles.info}>
      <div>
        <Image src="logo.svg" width={100} height={100} alt="Logo"></Image>
      </div>
      <div>
        <Call />
      </div>
      <div>
        <h3>{formatTime(time)}</h3>
      </div>
    </div>
  );
};

export default MenuBar;
