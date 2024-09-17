'use client'
import { useState } from "react";
import styles from "./page.module.css";
import Footer from "../components/Footer";
import MenuBar from "@/components/MenuBar";
import Info from "@/components/Info";
import Faq from "@/components/FAQ";
import Prompts from "@/components/Prompt";

// Dummy content for each page
const pages = {
  Info: <Info />,
  FAQs: <Faq />,
  Prompts: <Prompts />,
  // Submissions: <div>Submissions Page Content</div>,
};

export default function Home() {
  const [activePage, setActivePage] = useState(null);

  const handleMenuClick = (page) => {
    setActivePage(page);
  };

  return (
    <main className={styles.main}>
      <div className={styles.splitscreen}>
        <div className={styles.left}>
          <MenuBar />
          <div className={styles.menu}>
            <div className={styles.menuContainer}>
              {Object.keys(pages).map((page) => (
                <div className={styles.menuItem} key={page}>
                  <div
                    className={styles.menuStyle}
                    onClick={() => handleMenuClick(page)}
                  >
                    <h3 className={styles.listItem}>{page}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.right}>
          {activePage ? pages[activePage] : <div></div>}
        </div>
      </div>
      <Footer />
    </main>
  );
}
