import React from "react";
import styles from "@/styles/about.module.css";

const Section = ({ title, children }) => {
  return (
    <div className={styles.section}>
      <h4>{title}</h4>
      <p>{children}</p>
    </div>
  );
};

export default Section;
