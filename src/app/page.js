"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Machine from "./components/Machine";
import Footer from "./components/Footer";

export default function Home() {
  const prompts = [
    "Remember that time you realized the snooze button was your best friend?",
    "What’s something you’re grateful for, other than coffee and Wi-Fi?",
    "Does your dream involve napping and is it achievable while horizontal?",
    "What's the most enlightening 'Reply All' email mistake you’ve made?",
    "Why do socks vanish in the laundry?",
    "Have you ever found abstract art more confusing than an IKEA manual?",
    "Have you ever felt like a buffet for mosquitoes?",
    "What's the most embarrassing moment you’ve had that still makes you cringe?",
    "What’s your best 'I wish I stayed home' date story?",
    "What’s the most embarrassing fashion trend you once proudly followed?",
    "What was the time you handled an awkward situation with grace, or at least with humor?",
    "Have you ever watched a holiday gathering spiral into board game chaos?",
    "How did your DIY project end up with more glue on you than the project itself?",
    
    "Did you ever think your GPS was just testing your sense of direction?",
    "Have you ever mistaken the 'reply all' button for 'reply' and instantly regretted it?",
    "What's your most 'should have left the house five minutes earlier' traffic story?",
    "Have you ever confused an art exhibit for the storage closet?",
    "Did you ever realize halfway through a workout that your couch is a better fit?",
    "What's your funniest 'I definitely misunderstood the assignment' moment?",
    "Have you ever spent longer deciding what to watch than actually watching something?",
    "What's the most epic 'did that just happen?' moment you've witnessed?",
    "Ever been so confident in karaoke that you invented your own lyrics?",
    "What's your most dramatic tale of trying to assemble a piece of furniture?",
    "Ever accidentally sent a text to the person you were gossiping about?",
    "What's your most cringe-worthy encounter with a celebrity?",
    "Ever had a 'let's pretend that didn't happen' moment at work?",
    "Have you ever been so certain it was Friday, but it was only Wednesday?",
    "What's your most ridiculous 'this will look great in my living room' purchase?",
    "Have you ever accidentally worn your clothes inside out all day?",
    "What's your most awkward elevator encounter?",
    "Have you ever attempted a new recipe and ended up ordering takeout?",
    "What's your most 'should have known better' moment with a power tool?",
    "Have you ever committed to a New Year's resolution that lasted one whole day?",
    "What's your funniest story about trying to act cool in front of a crush?",
    "Ever wondered why the simplest instructions become the hardest puzzles?",
    "What's your most memorable encounter with a telemarketer?",
    "Have you ever had a 'this is not what I ordered' restaurant experience?",
    "What's your most epic tale of procrastination gone wrong?",
    "Have you ever felt like the only adult in a room full of grown-up children?",
    "What's your most creative excuse for not doing homework or work?",
    "Ever thought your dog was plotting against you for not sharing your snacks?",
    "What's your most hilarious travel story involving a missed flight or wrong destination?",
    "Have you ever experienced a day where everything was upside down, literally?",
    "What's your funniest story about trying to master a new hobby?",
    "Ever had a 'how did I end up here?' moment in a social situation?",
    "What's your most unforgettable story about surviving a family reunion?",
    "Have you ever had a technology fail at the worst possible moment?",
    "What's your most amusing story about mishearing song lyrics?"
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
          <Image src="phone-02.svg" width={100} height={100}></Image>
        </div>
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
