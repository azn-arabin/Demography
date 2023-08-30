import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Open_Sans } from "next/font/google";
import styles from "@/styles/common.module.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../../node_modules/@fortawesome/fontawesome-svg-core/styles.css";
import Navbar from "@/component/common/navbar";
import Container from "@/component/common/container";
import React from "react";
import Footer from "@/component/common/footer";
config.autoAddCss = false;

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Population Prediction in Bangladesh - A Demographic Study",
  description:
    "Population Predictor: A Web Application for" +
    " Population Forecasting based on Year and Average Children per Couple",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={openSans.className}>
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
