"use client";
import React, { useState } from "react";
import styles from "@/styles/home.module.css";
import { useForm } from "react-hook-form";
import BarChart from "@/component/home/chart";
import { toast, ToastContainer } from "react-toastify";
import { ClipLoader } from "react-spinners";
import Populations from "@/component/home/populations";
import Dependence from "@/component/home/dependence";
import InputErrors from "@/component/home/input-errors";
import { logEvent } from "firebase/analytics";
import { analytics } from "@/component/common/navbar";

const Demography = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toastHandler = (message, type) => {
    toast(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "colored",
      type,
    });
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await fetch("/api/demography", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTHENTICATION_KEY}`,
        },
        method: "POST",
      });

      if (response.status === 200) {
        const res = await response.json();
        setData(res);
        logEvent(analytics, "searched");
      } else {
        toastHandler("Something went wrong, Please try again later!", "error");
      }
    } catch (e) {
      if (e.response) {
        toastHandler("Something went wrong, Please try again later!", "error");
      } else if (e.request) {
        toastHandler("No Internet connection!", "warning");
      } else {
        toastHandler("Something went wrong, Please try again later!", "error");
      }
    }

    setLoading(false);
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputContainer}>
          <div className={styles.inputGroup}>
            <label>Child Per Couple*</label>
            <input
              type="number"
              step="0.01"
              {...register("child", { required: true, min: 0.5, max: 9 })}
              placeholder={"Average child..."}
              className={`${styles.input} ${
                errors.child ? styles.errorInput : ""
              }`}
            />
            {errors.child?.type === "required" && (
              <span className={`${styles.error} ${styles.smSrnErr}`}>
                Child is required.
              </span>
            )}
            {errors.child?.type === "min" && (
              <span className={`${styles.error} ${styles.smSrnErr}`}>
                Child must be greater than 0.4
              </span>
            )}
            {errors.child?.type === "max" && (
              <span className={`${styles.error} ${styles.smSrnErr}`}>
                Child must be less than 9 or equal to 9
              </span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>Enter Year*</label>
            <input
              type="number"
              {...register("year", { required: true, min: 2012, max: 2101 })}
              placeholder={"Year after 2011..."}
              className={`${styles.input} ${
                errors.year ? styles.errorInput : ""
              }`}
            />
            {errors.year?.type === "required" && (
              <span className={`${styles.error} ${styles.smSrnErr}`}>
                Year is required.
              </span>
            )}
            {errors.year?.type === "min" && (
              <span className={`${styles.error} ${styles.smSrnErr}`}>
                Year must be greater than 2011
              </span>
            )}
            {errors.year?.type === "max" && (
              <span className={`${styles.error} ${styles.smSrnErr}`}>
                Year must be less than 2102
              </span>
            )}
          </div>

          <button
            type={"submit"}
            className={`button ${styles.homeButton}`}
            disabled={loading}
          >
            Submit{" "}
            <ClipLoader color={"var(--nav-text"} size={18} loading={loading} />
          </button>
        </div>

        <InputErrors errors={errors} />
      </form>
      {data ? (
        <>
          <Populations
            p2011={data.p2011}
            p2022={data.year >= 2022 ? data.p2022 : false}
            year={data.year}
            child={data.child}
            updatedPopulations={data.updatedPopulations}
          />
          <BarChart
            calculatedPopulations={data.calculatedPopulations}
            currentYear={data.currentYear}
            year={data.year}
          />
        </>
      ) : (
        <Dependence />
      )}
      <ToastContainer />
    </div>
  );
};

export default Demography;
