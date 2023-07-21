"use client";
import React from "react";
import styles from "@/styles/contact.module.css";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";

const ContactForm = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formTitles}>
        <h3>Have any questions, feedback, or want to provide guidance?</h3>
        <h4>Feel free to share your thoughts with us.</h4>
      </div>
      <div className={styles.oneLineInputs}>
        <div className={styles.inputGroup}>
          <label>Name*</label>
          <input
            type="text"
            {...register("name", { required: true, maxLength: 30 })}
            placeholder={"Your name..."}
            className={`${styles.input} ${
              errors.name ? styles.errorInput : ""
            }`}
          />
          {errors.name?.type === "required" && (
            <span className={styles.error}>Name is required.</span>
          )}
          {errors.name?.type === "maxLength" && (
            <span className={styles.error}>
              Name should be maximum 30 characters.
            </span>
          )}
        </div>
        <div className={styles.inputGroup}>
          <label>Email*</label>
          <input
            type="email"
            {...register("email", {
              required: true,
              minLength: 1,
              maxLength: 30,
            })}
            placeholder={"Your email..."}
            className={`${styles.input} ${
              errors.email ? styles.errorInput : ""
            }`}
          />
          {errors.email?.type === "required" && (
            <span className={styles.error}>Email is required.</span>
          )}
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label>Subject*</label>
        <input
          type="text"
          {...register("subject", { required: true, maxLength: 110 })}
          placeholder={"Subject..."}
          className={`${styles.input} ${
            errors.subject ? styles.errorInput : ""
          }`}
        />
        {errors.subject?.type === "required" && (
          <span className={styles.error}>Subject is required.</span>
        )}
        {errors.subject?.type === "maxLength" && (
          <span className={styles.error}>
            Subject should be maximum 110 characters.
          </span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label>Message*</label>
        <textarea
          {...register("message", { required: true, maxLength: 600 })}
          placeholder={"Leave a message here..."}
          className={`${styles.input} ${
            errors.message ? styles.errorInput : ""
          }`}
        />
        {errors.message?.type === "required" && (
          <span className={styles.error}>Message is required.</span>
        )}
        {errors.message?.type === "maxLength" && (
          <span className={styles.error}>
            Message should be maximum 600 characters.
          </span>
        )}
      </div>

      <button
        className={"button"}
        type={"submit"}
        style={{
          marginTop: "10px",
        }}
        disabled={loading}
      >
        Send Message{" "}
        <ClipLoader color={"var(--nav-text"} size={18} loading={loading} />
      </button>
    </form>
  );
};

export default ContactForm;
