import React from "react";
import styles from "@/styles/home.module.css";
import CountUpAnimation from "@/component/home/count-up-animation";

const Population = ({ title, children, predictor }) => {
  return (
    <div className={styles.population}>
      <span>{title}</span>
      <CountUpAnimation endValue={children} startValue={children - 20000000} />
      <span>{predictor}</span>
    </div>
  );
};

export default Population;
