"use client";
import React, { useState } from "react";
import styles from "./PromptButton.module.css";
import Call from "./Call";
import { getCurrentPrompt } from "@/utils/prompts";
import Popup from "./Popup";

import { spinPromptRoulette, PROMPT_ROULETTE } from "@/utils/promptRoulette";
import SlotReelText from "./SlotReelText";

const PromptButton = ({ hoverText = "This week’s prompt" }) => {
  const [openPrompt, setOpenPrompt] = useState(false);
  const [openRoulette, setOpenRoulette] = useState(false);

  const prompt = getCurrentPrompt();

  const [spinStack, setSpinStack] = useState([]);
  const [spinKey, setSpinKey] = useState(0);

  function buildSpinStack(finalPrompt, count = 6) {
    const stack = [];

    for (let i = 0; i < count - 1; i++) {
      stack.push(
        PROMPT_ROULETTE[
          Math.floor(Math.random() * PROMPT_ROULETTE.length)
        ]
      );
    }

    stack.push(finalPrompt); // landing slot
    return stack;
  }

  return (
    <div className={styles.buttonContainer}>
      {/* Floating button */}
      <button className={styles.button} onClick={() => setOpenPrompt(true)}>
        <div className={styles.hoverText}>{hoverText}</div>
        <div className={styles.iconContainer}>
          ?
        </div>
      </button>

      {/* Popup: Current prompt */}
      <Popup
        isOpen={openPrompt}
        onClose={() => setOpenPrompt(false)}
        title="This week’s prompt"
      >
        <p>
          <strong>{prompt}</strong>
        </p>

        <Call />

        <p className={styles.promptNote}>Rambling encouraged.</p>

        <button
          className={styles.archiveLink}
          onClick={() => {
            const final = spinPromptRoulette();
            setSpinStack(buildSpinStack(final));
            setSpinKey((k) => k + 1);
            setOpenRoulette(true);
          }}
        >
          Play PROMPT ROULETTE if you want to get wild →
        </button>
      </Popup>

      {/* Popup: Prompt Roulette */}
      <Popup
        isOpen={openRoulette}
        onClose={() => setOpenRoulette(false)}
        offset={{ x: -90, y: -70 }}
        title="Prompt slot machine"
      >
        <SlotReelText spins={spinStack} spinKey={spinKey} />

        <button
          className={styles.archiveLink}
          onClick={() => {
            const final = spinPromptRoulette();
            setSpinStack(buildSpinStack(final));
            setSpinKey((k) => k + 1);
          }}
        >
          Spin →
        </button>
      </Popup>
    </div>
  );
};
export default PromptButton;
