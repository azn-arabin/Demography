import React from "react";
import styles from "@/styles/home.module.css";
import numeral from "numeral";

const Population = ({ title, children, predictor }) => {
  return (
    <div className={styles.population}>
      <span>{title}</span>
      <h2>{numeral(children).format("0,0,0,000")}</h2>
      <span>{predictor}</span>
    </div>
  );
};

export default Population;
