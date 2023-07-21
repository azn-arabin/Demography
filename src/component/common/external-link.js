import React from "react";
import styles from "@/styles/common.module.css";

const ExternalLink = ({ href, children, target = "_blank" }) => {
  return (
    <a
      className={styles.link}
      target={target}
      rel="noopener noreferrer"
      href={href}
    >
      {children}
    </a>
  );
};

export default ExternalLink;
