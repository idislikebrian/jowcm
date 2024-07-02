"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Machine from "./components/Machine";
import Footer from "./components/Footer";

export default function Home() {
  const prompts = [
    "Describe a moment in your life that changed your perspective or path. How did it shape who you are today?",
    "Share something you're grateful for and how it impacts your daily life.",
    "Discuss a dream you have and what steps you're taking to achieve it. How does pursuing this dream make you feel?",
    "Share a lesson you learned the hard way and how it's influenced your approach to life.",
    "Recall a time when an act of kindness, big or small, made a significant impact on your life.",
    "Share your thoughts on a philosophical question that intrigues you. For example, what is the meaning of success? What role does fate play in our lives?",
    "Have you experienced a serendipitous moment that felt like destiny? Share that story.",
    "Talk about a piece of art (music, literature, visual arts) that profoundly affected you. Why did it resonate with you?",
    "Share an experience or tradition from your culture that holds deep meaning for you.",
    "What is one change you hope to see in the world in your lifetime?",
    "Share a moment when you felt deeply connected to nature. What did it reveal to you about life or yourself?",
    "Reflect on how technology has changed your life for better or worse.",
    "Share a hilarious and awkward moment. How did you handle it?",
    "Tell us about a time when things went hilariously wrong. What was the epic fail?",
    "Recall a funny misunderstanding you were involved in. How did it get resolved?",
    "Describe your funniest bad date experience. What made it so memorable?",
    "Share a story about a cooking experiment that went comically awry.",
    "What’s the most ridiculous fashion trend you’ve ever followed?",
    "Tell us about a funny or bizarre thing your pet has done.",
    "Recall a time when you or someone you know hilariously failed at using technology.",
    "Ever had a phrase or word get hilariously lost in translation?",
    "Talk about a DIY project that ended up being a disaster (but hopefully no one got hurt).",
    "What’s a funny misconception you had as a child?",
    "Do you have an unusual fear? Tell us about it and why it’s funny to you.",
    "Tell us about a moment that shifted your vibe. How did it mold the person you are today?",
    "Spill the tea on your big dream and what moves you're making to make it real. How does hustling for it make you feel?",
    "Share a tough lesson you learned and how it shook up your game plan.",
    "Remember when someone’s kindness hit you in the feels? Tell us about that game-changing moment.",
    "What's a head-scratcher that's got you thinking? Like, what's the deal with success or fate?",
    "Ever had a moment where everything felt like it was meant to be?",
    "Talk about a piece of art that hit you right in the feels. Why did it speak to your soul?",
    "Share a tradition or moment from your culture that's got mad meaning for you.",
    "What's one thing you're gunning for in the world, like, before you're old?",
    "How's tech changing your life, for better or for worse?",
    "Spill the tea on a moment so awkward, it's hilarious. How'd you handle it?",
    "Share the tea on a holiday gathering gone wild.",
    "Ever had a phrase or word get totally lost in translation and it was straight-up LOL?",
    "Talk about a DIY project that went south real quick (hopefully, no one got hurt!).",
    "What's a hilarious thing you believed as a kid?",
    "Share a travel mishap that had you laughing (or crying) all the way home.",
  ];

  const [selectedPrompt, setSelectedPrompt] = useState("");

  const handlePromptClick = () => {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    setSelectedPrompt(prompts[randomIndex]);
  };

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

    // Cleanup function to remove event listeners
    return () => {
      Array.from(coll).forEach((element) => {
        element.removeEventListener("click", handleClick);
      });
    };
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.centered}>
        <div className={styles.logo}>
          <Image src="logo.svg" width={200} height={100}></Image>
        </div>
        <div className={styles.hero}>
          <h1>772-742-1283</h1>
          <p>
            So, listen, I&apos;ve got this idea — an experiment to recognize the
            immense power of collective generosity.
          </p>
          <p>Participating is easy! Just follow these simple steps:</p>
          <ol>
            <li>
              Dial <a href="tel:+17727421283">772-742-1283</a>.
            </li>
            <li>
              Once connected, record your message. You can choose any prompt
              from our list or speak freely about anything that interests you.
            </li>
          </ol>
          <p>
            For now, the recordings max out at around 2m 40s — If you have a
            long story you will have to leave two messages.
          </p>
          <p>
            Remember, your voicemail can be completely anonymous. Feel free to
            share your name and details but only if you&apos;re comfortable doing so.
          </p>
        </div>
        <div className={styles.answering}>
          <Machine />
        </div>
        <div className={styles.prompt}>
          <button onClick={handlePromptClick} className={styles.promptButton}>
            Click here if you don&apos;t know what you want to talk about
          </button>
          {selectedPrompt && (
            <p className={styles.selectedPrompt}>{selectedPrompt}</p>
          )}
        </div>
        <div className={styles.faq}>
          <h3>F.A.Q.</h3>
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
        <div className={styles.footer}>
          <Footer />
        </div>
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
