import React from "react";
import styles from "@/styles/about.module.css";

const Introduction = ({ title, children }) => {
  return (
    <div className={styles.introduction}>
      <p>{title}</p>
      <h4>
        <span>{children}</span>
        <span>Department of EEE,</span>
        <span>University of Rajshahi</span>
      </h4>
    </div>
  );
};

export default Introduction;
