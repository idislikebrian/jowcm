"use client";
import { motion, AnimatePresence, useMotionValue, useDragControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./Popup.module.css";

let zIndexCounter = 100;

export default function Popup({
  isOpen,
  onClose,
  title,
  children,
  offset = { x: 0, y: 0 },
}) {
  const ref = useRef(null);
  const dragControls = useDragControls();

  const x = useMotionValue(offset.x);
  const y = useMotionValue(offset.y);

  const [zIndex, setZIndex] = useState(zIndexCounter);

  // z-index stacking
  useEffect(() => {
    if (isOpen) {
      zIndexCounter += 1;
      setZIndex(zIndexCounter);
    }
  }, [isOpen]);

  // click-outside close
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          style={{ zIndex }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={ref}
            className={styles.popup}
            style={{ x, y }}
            drag
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            dragConstraints={{
              top: -window.innerHeight / 2 + 60,
              bottom: window.innerHeight / 2 - 60,
              left: -window.innerWidth / 2 + 60,
              right: window.innerWidth / 2 - 60,
            }}
            initial={{
              scale: 0.98,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.98,
              opacity: 0,
            }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onMouseDown={() => {
              zIndexCounter += 1;
              setZIndex(zIndexCounter);
            }}
          >
            {/* Menubar = drag handle */}
            <div
              className={styles.menubar}
              onPointerDown={(e) => dragControls.start(e)}
            >
              <span>{title}</span>
              <button
                className={styles.close}
                onClick={onClose}
                aria-label="Close window"
              >
                ×
              </button>
            </div>

            <div className={styles.popupBody}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
