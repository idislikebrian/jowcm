"use client";
import { motion } from "framer-motion";
import styles from "./SlotReelText.module.css";

const SLOT_HEIGHT = 120;

export default function SlotReelText({ spins, spinKey }) {
  return (
    <div
      className={styles.reel}
      style={{ height: SLOT_HEIGHT }}
    >
      <motion.div
        key={spinKey}
        className={styles.column}
        initial={{ y: 0 }}
        animate={{ y: -SLOT_HEIGHT * (spins.length - 1) }}
        transition={{
          duration: 0.9,
          ease: [0.19, 1, 0.22, 1], // decelerating, mechanical
        }}
      >
        {spins.map((text, i) => (
          <div
            key={i}
            className={styles.item}
            style={{ height: SLOT_HEIGHT }}
          >
            {text}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
