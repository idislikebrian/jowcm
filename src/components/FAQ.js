"use client";
import { useEffect, useState } from "react";
import styles from "@/components/FAQ.module.css";

export default function Faq() {
  useEffect(() => {
    const coll = document.getElementsByClassName(styles.collapsible);

    const handleClick = function () {
      console.log("Button clicked:", this);
      this.classList.toggle(styles.active);
      const content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    };

    Array.from(coll).forEach((element) => {
      console.log("Adding event listener to:", element);
      element.addEventListener("click", handleClick);
    });

    return () => {
      Array.from(coll).forEach((element) => {
        element.removeEventListener("click", handleClick);
      });
    };
  }, []);

  return (
    <main className={styles.main}>
        <div className={styles.faq}>
          {faqItems.map((item, index) => (
            <div className={styles.question} key={index}>
              <button type="button" className={styles.collapsible}>
                {item.question}
              </button>
              <div className={styles.content}>
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
    </main>
  );
}

const faqItems = [
  {
    question: "How long can the voicemail be?",
    answer:
      "As of now the messages max out at around 2 min and 40 secs. If you run out of time, please call to leave part II. I encourage you.",
  },
  {
    question: "Will my number be shared or displayed?",
    answer: "Absolutely not. Phone numbers will never be shared.",
  },
  {
    question: "Can I call more than once?",
    answer:
      "Yes, please do. Share multiple stories or thoughts on different occasions.",
  },
  {
    question: "How will these voicemails be used?",
    answer:
      "Your messages will be played during the livestream and that's it. The recordings are exclusively for the sake and usage of this project (Journaling Outdoors Would Cure Me) and will not be used in any other way.",
  },
  {
    question: "Do you assume ownership of the stories?",
    answer:
      "Journaling Outdoors Would Cure Me and me, Brian Felix do not assume ownership in any way of the stories told in these recordings.",
  },
  {
    question: "Will any information be shared with third parties?",
    answer:
      "No information is shared with third parties (we'll never publish your phone number, feel free to use *67 if you'd like).",
  },
  {
    question: "What if I make a mistake while recording?",
    answer:
      "Don’t worry! Just pause and continue. I appreciate the authenticity.",
  },
];
