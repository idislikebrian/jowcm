"use client";
import styles from "../app/page.module.css";

const ARCHIVED_PROMPTS = [
  {
    yearWeek: "2024.W38",
    prompt:
      "You’ve been hired to rebrand Hell. What’s the first thing you’d change to make it less (or more)... Hell?",
  },
  {
    yearWeek: "2024.W37",
    prompt:
      "If animals could talk, which one do you think would be the rudest little shit and why?",
  },
  {
    yearWeek: "2024.W36",
    prompt:
      "If you had to fight one hundred duck-sized horses or one big-ass horse-sized duck, which would you take down first and why?",
  },
];

const PROMPT_CYCLE = [
  "When the beep hits, describe the last thing you saw on your feed today, then keep talking.",
  "Say a phrase you’ve heard too much this week, then don’t explain it.",
  "Start by talking about something you keep almost clicking on.",
  "Say the name of something everyone seems to be watching or sharing, then drift.",
  "Describe how this week feels so far. No backstory.",
  "Start by describing the last ad you remember seeing today.",
  "Talk about something you’ve been scrolling past on purpose.",
  "Say something you’ve seen repeated everywhere lately, then keep talking.",
  "Describe your energy level right now without explaining why.",
  "Repeat a phrase you don’t fully believe anymore, then drift.",
  "Start by saying what you wish you were paying more attention to.",
  "Talk until you forget what you were originally going to say."
];

function getISOWeek(date = new Date()) {
  const temp = new Date(date.valueOf());
  const dayNum = (date.getUTCDay() + 6) % 7;
  temp.setUTCDate(temp.getUTCDate() - dayNum + 3);
  const firstThursday = new Date(Date.UTC(temp.getUTCFullYear(), 0, 4));
  return (
    1 +
    Math.round(
      ((temp - firstThursday) / 86400000 - 3) / 7
    )
  );
}

export default function Prompts() {
  const weekIndex = getISOWeek() % PROMPT_CYCLE.length;
  const currentPrompt = PROMPT_CYCLE[weekIndex];

  return (
    <main className={styles.main}>
      <div className={styles.promptContainer}>
        {/* Current Prompt */}
        <div className={styles.latestPromptItem}>
          <h3>This week’s prompt</h3>
          <p>{currentPrompt}</p>
        </div>

        {/* Archive */}
        <div className={styles.archive}>
          <h4>Archived prompts</h4>
          {ARCHIVED_PROMPTS.map((item, index) => (
            <div key={index} className={styles.promptItem}>
              <h5>{item.yearWeek}</h5>
              <p>{item.prompt}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
