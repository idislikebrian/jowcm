'use client';
import styles from "./page.module.css";
import ThreeScene from "@/components/ThreeScene";
import MenuBar from "@/components/MenuBar";
import BackgroundVideo from "@/components/BackgroundVideo";
import Ticker from "@/components/Ticker";
import MenuButton from"@/components/MenuButton";
import Flash from "@/components/Flash";
import Voice from "@/components/Voice";

export default function Home() {
  return (
    <div className={styles.main}>
      <BackgroundVideo />
      <Ticker text="If your body could leave a Yelp review of your life, what would it say?" />
      
      <div className={styles.menu}>
        {/* <MenuButton hoverText="menu"/> */}
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
  );
}
