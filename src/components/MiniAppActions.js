"use client";

import { useEffect, useState } from "react";
import { useAddFrame, useMiniKit } from "@coinbase/onchainkit/minikit";
import styles from "./MiniAppActions.module.css";
import { isMiniAppContext } from "@/utils/miniapp";

export default function MiniAppActions() {
  const { context } = useMiniKit();
  const addFrame = useAddFrame();
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);

  const isMiniApp = isMiniAppContext(context);
  const isAdded = Boolean(context?.client?.added);

  if (!isMiniApp) {
    return null;
  }

  useEffect(() => {
    if (!saveError) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setSaveError(false);
    }, 2500);

    return () => window.clearTimeout(timeoutId);
  }, [saveError]);

  async function handleSave() {
    setIsSaving(true);
    setSaveError(false);

    try {
      const result = await addFrame();
      if (!result) {
        setSaveError(true);
      }
    } catch (error) {
      console.error("Failed to save Mini App", error);
      setSaveError(true);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      {isAdded ? (
        <div className={styles.saved}>Saved in Base app</div>
      ) : (
        <button
          type="button"
          className={`${styles.button}${saveError ? ` ${styles.error}` : ""}`}
          disabled={isSaving}
          onClick={handleSave}
        >
          {isSaving ? "Saving..." : saveError ? "Save unavailable" : "Save Mini App"}
        </button>
      )}
    </div>
  );
}
