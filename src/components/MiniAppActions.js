"use client";

import { useEffect, useState } from "react";
import styles from "./MiniAppActions.module.css";
import { useFarcasterMiniApp } from "@/providers/FarcasterProvider";

export default function MiniAppActions() {
  const { addMiniApp, context, isMiniApp } = useFarcasterMiniApp();
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);

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
      const result = await addMiniApp();
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
        <div className={styles.saved}>Saved in app</div>
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
