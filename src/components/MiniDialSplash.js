'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import styles from './MiniDialSplash.module.css';

const KEYS = [
  '1','2','3',
  '4','5','6',
  '7','8','9',
  '*','0','#',
];

const DIAL_SEQUENCE = ['1','6','0','1','6','8','8','7','4','3','3'];

export function MiniDialSplash({ children }) {
  const force = process.env.NEXT_PUBLIC_FORCE_MINI_SPLASH === 'true';

  let sdk, isMiniApp;

  try {
    const mini = useMiniKit();
    sdk = mini.sdk;
    isMiniApp = mini.isMiniApp;
  } catch {
    isMiniApp = false;
  }

  const enabled = isMiniApp || force;

  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);

  // 1️⃣ Drive the dialing animation ONLY
  useEffect(() => {
    if (!enabled || finished) return;

    if (step < DIAL_SEQUENCE.length) {
      const t = setTimeout(() => setStep(step + 1), 300);
      return () => clearTimeout(t);
    }

    setFinished(true);
  }, [step, enabled, finished]);

  // 2️⃣ Signal readiness ONLY when SDK is actually available
  useEffect(() => {
    if (!enabled || !finished) return;

    if (isMiniApp && sdk?.actions?.ready) {
      sdk.actions.ready();
    }
  }, [enabled, finished, isMiniApp, sdk]);

  const activeKey = DIAL_SEQUENCE[step - 1];
  const progress = step / DIAL_SEQUENCE.length;

  return (
    <AnimatePresence mode="wait">
      {/* Splash */}
      {enabled && !finished && (
        <motion.div
          key="splash"
          className={styles.root}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          <div className={styles.progressTrack}>
            <motion.div
              className={styles.progressFill}
              animate={{ scaleX: progress }}
              transition={{ ease: 'linear', duration: 0.2 }}
            />
          </div>

          <div className={styles.dialpad}>
            {KEYS.map((key) => (
              <motion.div
                key={key}
                className={styles.key}
                animate={{
                  scale: key === activeKey ? 0.9 : 1,
                  backgroundColor:
                    key === activeKey ? 'var(--wasabi)' : 'var(--yellow)',
                }}
                transition={{ duration: 0.15 }}
              >
                {key}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* App */}
      {(!enabled || finished) && (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
