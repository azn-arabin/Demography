import React from "react";
import styles from "@/styles/home.module.css";

const InputErrors = ({ errors }) => {
  return (
    <div className={styles.errorsContainer}>
      <div className={styles.errorContainer}>
        {errors.child?.type === "required" && (
          <span className={styles.error}>Child is required.</span>
        )}
        {errors.child?.type === "min" && (
          <span className={styles.error}>Child must be greater than 0.4</span>
        )}
        {errors.child?.type === "max" && (
          <span className={styles.error}>
            Child must be less than or equal to 9
          </span>
        )}
      </div>
      <div className={styles.errorContainer}>
        {errors.year?.type === "required" && (
          <span className={styles.error}>Year is required.</span>
        )}
        {errors.year?.type === "min" && (
          <span className={styles.error}>Year must be greater than 2011</span>
        )}
        {errors.year?.type === "max" && (
          <span className={styles.error}>Year must be less than 2102</span>
        )}
      </div>
    </div>
  );
};

export default InputErrors;
