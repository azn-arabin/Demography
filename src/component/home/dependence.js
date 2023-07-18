import React from "react";
import styles from "@/styles/home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";

const Dependence = () => {
  return (
    <div className={styles.dependence}>
      <div className={styles.dTitles}>
        <h2>Population Prediction of Bangladesh</h2>
        <span>From 2011 to 2101 based on child and year</span>
      </div>
      <div className={styles.dContents}>
        <div>
          <div className={styles.dCTitle}>
            <FontAwesomeIcon icon={faRocket} />
            <h3>Capabilities</h3>
          </div>
          <span className={styles.dContent}>
            Provides population estimation for Bangladesh based on user inputs.
          </span>
          <span className={styles.dContent}>
            Visualizes population trends through an interactive graph from 2011
            to the selected year.
          </span>
          <span className={styles.dContent}>
            Provides a user-friendly interface for seamless exploration of
            demographic information.
          </span>
        </div>
        <div>
          <div className={styles.dCTitle}>
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <h3>Limitations</h3>
          </div>
          <span className={styles.dContent}>
            The population projections are based on assumptions and available
            data, and may not reflect accurate figures.
          </span>
          <span className={styles.dContent}>
            The population projections are limited to the time frame of 2011 to
            2101.
          </span>
          <span className={styles.dContent}>
            Population projections may be subject to data limitations, requiring
            careful interpretation for reliable insights.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dependence;
