"use client";

import styles from "./page.module.css";
import ThreeScene from "@/components/ThreeScene";
import MenuBar from "@/components/MenuBar";
import BackgroundVideo from "@/components/BackgroundVideo";
import Ticker from "@/components/Ticker";
import Flash from "@/components/Flash";
import Voice from "@/components/Voice";
import PromptButton from "@/components/PromptButton";
import { MiniDialSplash } from "@/components/MiniDialSplash";
import { getCurrentPrompt } from "@/utils/prompts";

export default function HomePageClient() {
  return (
    <MiniDialSplash>
      <div className={styles.main}>
        <BackgroundVideo />
        <Ticker text={getCurrentPrompt()} />

        <div className={styles.menu}>
          <PromptButton hoverText="info" />
        </div>
        <div className={styles.content}>
          <Flash
            blinkFrequency={2000}
            messageChangeFrequency={150}
            timeBetweenMessages={20000}
            messages={[
              "Call Now!",
              "Ramble On!",
              "Journaling",
              "Outdoors",
              "Would",
              "Cure",
              "Me",
              "Dial In!",
            ]}
          />
          <div style={{ position: "absolute", bottom: 20, left: "10%" }}>
            <p>You can also text (601) 688-7433 to start.</p>

            <p style={{ fontSize: 12, marginTop: 8, opacity: 0.7 }}>
              By texting, you agree to receive messages from JOWCM. Message
              frequency varies. Message & data rates may apply. Reply STOP to
              opt out, HELP for help. See <a href="/privacy">Privacy</a> and{" "}
              <a href="/terms">Terms</a>.
            </p>
          </div>
          <Voice />
          <MenuBar />
          <ThreeScene />
        </div>
      </div>
    </MiniDialSplash>
  );
}
