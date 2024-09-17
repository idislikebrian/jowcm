import styles from "../app/page.module.css";
import Image from "next/image";
import Call from "./Call";

export default function Info() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.logo}>
          <img src="logo.svg"></img>
          <div className={styles.buttonSpace}>
            <Call />
          </div>
        </div>
        <div className={styles.schedule}>
          <p>Streaming every Tuesday 11:00 to 14:00 Eastern</p>
        </div>
        <div className={styles.tutorial}>
          <div>
            <p className={styles.num}>i</p>
            <p>
              Tap the number above.<br></br>Wait for the
              beep.
            </p>
          </div>
          <div>
            <p className={styles.num}>ii</p>
            <p>Leave a message.<br></br>Follow the prompt, or do your own thing.</p>
          </div>
          <div>
            <p className={styles.num}>iii</p>
            <p>
              Hang up.<br></br>Touch some grass.
            </p>
          </div>
        </div>
        <div>
          <p className={styles.fine}>
            * Remember, your voicemail can be completely anonymous. Feel free to
            share your name and details but only if you&apos;re comfortable
            doing so.
          </p>
          <p className={styles.fine}>
            * For now, the recordings max out at around 2m 40s — If you have a
            long story you will have to leave two messages.
          </p>
        </div>
      </div>
    </main>
  );
}
