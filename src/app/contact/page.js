"use client";
import React, { useState } from "react";
import styles from "@/styles/contact.module.css";
import { toast, ToastContainer } from "react-toastify";
import ContactForm from "@/component/contact/contact-form";
import LeftSide from "@/component/contact/left-side";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [prevMail, setPrevMail] = useState("");

  const toastHandler = (message, type) => {
    toast(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "colored",
      type,
    });
  };

  const onSubmit = async (data) => {
    setLoading(true);
    if (data.email === prevMail) {
      toastHandler(
        "Message received! Please try again later or use a different email if needed.",
        "warning"
      );
    } else {
      try {
        if (typeof window !== "undefined" && !window.navigator.onLine) {
          throw new Error("No Internet connection!");
        }

        const response = await fetch("/api/sendgrid", {
          body: JSON.stringify({
            ...data,
            subject: `From Demography - ${data.subject}`,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SENDGRID_AUTHENTICATION_KEY}`,
          },
          method: "POST",
        });

        if (response.status === 200) {
          const result = await response.json();
          toastHandler(result.message, "success");
          setPrevMail(data.email);
        } else {
          toastHandler(
            "Something went wrong! Please try again later.",
            "error"
          );
        }
      } catch (e) {
        if (e.message === "No Internet connection!") {
          toastHandler("No Internet connection!", "warning");
        } else {
          toastHandler(
            "Something went wrong, Please try again later!",
            "error"
          );
        }
      }
    }
    setLoading(false);
  };

  return (
    <div className={styles.contact}>
      <LeftSide />
      <ContactForm onSubmit={onSubmit} loading={loading} />
      <ToastContainer />
    </div>
  );
};

export default Contact;
