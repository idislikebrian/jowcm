import React, { useState, useEffect } from "react";
import styles from "../app/page.module.css";
import Image from "next/image";
import Call from "./Call";

const MenuBar = () => {
  const [time, setTime] = useState(new Date());
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setBlink((prev) => !prev);
    }, 1300);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const timezone = date
      .toLocaleTimeString("en-US", { timeZoneName: "short" })
      .split(" ")
      .pop();

    return {
      hours,
      minutes,
      seconds,
      timezone,
    };
  };

  const { hours, minutes, seconds, timezone } = formatTime(time);

  return (
    <div className={styles.info}>
      <div>
        <Image
          src="logo-left.svg"
          width={100}
          height={100}
          alt="Logo"
          priority={true}
        />
      </div>
      <div className={styles.cta}>
        <Call />
      </div>
      <div>
        <h3>
          {hours}
          <span className={styles.separator}>{blink ? ":" : " "}</span>
          {minutes}
          <span className={styles.separator}>{blink ? ":" : " "}</span>
          {seconds} <span>({timezone})</span>
        </h3>
      </div>
    </div>
  );
};

export default MenuBar;
