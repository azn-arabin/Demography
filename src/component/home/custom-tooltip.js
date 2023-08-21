import React from "react";
import styles from "@/styles/division.module.css";
import numeral from "numeral";

const CustomToolTip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <span>{payload[0].name}</span>
        <span>{numeral(payload[0].value.toFixed(0)).format("0,0")}</span>
      </div>
    );
  }

  return null;
};

export default CustomToolTip;
