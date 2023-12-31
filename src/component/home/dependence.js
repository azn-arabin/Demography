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
            Visualizes population trends through an interactive graph from 2011
            to the selected year.
          </span>
          <span className={styles.dContent}>
            Explore Intricate Population Density Patterns with an Interactive
            Map Visualization Experience.
          </span>
          <span className={styles.dContent}>
            Facilitates population projection for divisions and districts using
            interactive pie charts.
          </span>
        </div>
        <div>
          <div className={styles.dCTitle}>
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <h3>Limitations</h3>
          </div>
          <span className={styles.dContent}>
            The population projections are based on assumption and available
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
