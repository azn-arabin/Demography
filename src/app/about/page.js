import React from "react";
import styles from "@/styles/about.module.css";
import Description from "@/component/about/description";

const About = () => {
  return (
    <div className={styles.about}>
      <div className={styles.leftSide}>
        <div className={styles.green} />
      </div>
      <Description />
    </div>
  );
};

export default About;
