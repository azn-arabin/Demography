import React from "react";
import styles from "@/styles/contact.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

const LeftSide = () => {
  return (
    <div className={styles.leftSide}>
      <div className={styles.green}>
        <FontAwesomeIcon icon={faMessage} />
        <span>Shoot a Message</span>
      </div>
    </div>
  );
};

export default LeftSide;
