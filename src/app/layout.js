import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Inter } from "next/font/google";
import styles from "@/styles/common.module.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../../node_modules/@fortawesome/fontawesome-svg-core/styles.css";
import Navbar from "@/component/common/navbar";
import Container from "@/component/common/container";
import React from "react";
import Footer from "@/component/common/footer";
import { firebaseConfig } from "@/config/firebase";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

const app = initializeApp(firebaseConfig);

export let analytics;

if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export const metadata = {
  title: "Population Prediction in Bangladesh - A Demographic Study",
  description:
    "Population Predictor: A Web Application for" +
    " Population Forecasting based on Year and Average Children per Couple",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <div className={styles.mainLayout}>
            <Navbar />
            <div className={styles.blur1} />
            <div className={styles.blur2} />
            <div className={styles.layout}>
              <Container>{children}</Container>
            </div>
            <Footer />
          </div>
        </main>
      </body>
    </html>
  );
}
