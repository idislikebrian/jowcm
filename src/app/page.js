"use client";
import styles from "./page.module.css";
import ThreeScene from "@/components/ThreeScene";
import MenuBar from "@/components/MenuBar";
import BackgroundVideo from "@/components/BackgroundVideo";
import Ticker from "@/components/Ticker";
import MenuButton from "@/components/MenuButton";
import Flash from "@/components/Flash";
import Voice from "@/components/Voice";
import PromptButton from "@/components/PromptButton";
import { MiniDialSplash } from "@/components/MiniDialSplash";
import { getCurrentPrompt } from "@/utils/prompts";


export default function Home() {
  return (
    <MiniDialSplash>
      <div className={styles.main}>
        <BackgroundVideo />
        <Ticker text={getCurrentPrompt()} />

        <div className={styles.menu}>
          {/* <MenuButton hoverText="menu"/> */}
          <PromptButton hoverText="info" />
        </div>
        <div className={styles.content}>
          
        <Flash 
            blinkFrequency={2000} 
            messageChangeFrequency={150} 
            timeBetweenMessages={20000} 
            messages={["Call Now!", "Ramble On!", "Journaling", "Outdoors", "Would", "Cure", "Me", "Dial In!"]} 
        />

          <Voice />
          <MenuBar />
          <ThreeScene />
        </div>
      </div>
    </MiniDialSplash>
  );
}
