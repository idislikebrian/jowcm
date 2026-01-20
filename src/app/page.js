"use client";
import styles from "./page.module.css";
import ThreeScene from "@/components/ThreeScene";
import MenuBar from "@/components/MenuBar";
import BackgroundVideo from "@/components/BackgroundVideo";
import Ticker from "@/components/Ticker";
import MenuButton from "@/components/MenuButton";
import Flash from "@/components/Flash";
import Voice from "@/components/Voice";
import PromptButton from "@/components/PromptInfoButton";
import { MiniDialSplash } from "@/components/MiniDialSplash";

export default function Home() {
  return (
    <MiniDialSplash>
      <div className={styles.main}>
        <BackgroundVideo />
        <Ticker text="Lights failed in Europe, but the music played on in Los Angeles --- When the grid goes down, what keeps you glowing?" />

        <div className={styles.menu}>
          {/* <MenuButton hoverText="menu"/> */}
          <PromptButton hoverText="info" />
        </div>
        <div className={styles.content}>
          {/* 
        <Flash 
            blinkFrequency={1000} 
            messageChangeFrequency={2500} 
            timeBetweenMessages={20000} 
            messages={["Call Now!!!!!"]} 
        />
        */}

          <Voice />
          <MenuBar />
          <ThreeScene />
        </div>
      </div>
    </MiniDialSplash>
  );
}
