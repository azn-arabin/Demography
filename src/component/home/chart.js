"use client";
import React, { useState } from "react";
import styles from "@/styles/home.module.css";
import {
  CartesianGrid,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  LineChart,
  Line,
} from "recharts";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import numeral from "numeral";

export default function MyChart({ calculatedPopulations, currentYear, year }) {
  const [chartType, setChartType] = useState("bar");

  const maxPopulation = Math.max(
    ...calculatedPopulations.map((data) => data.populations)
  );

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartTitle}>
        <h3>
          <FontAwesomeIcon icon={faCalendarDays} />{" "}
          {`${currentYear} -- ${year}`}
        </h3>
        <div className={styles.chartInput}>
          <label>Chart type:</label>
          <select
            className={styles.input}
            defaultValue={"bar"}
            onChange={(e) => setChartType(e.target.value)}
          >
            <option value={"bar"}>Bar</option>
            <option value={"line"}>Line</option>
          </select>
        </div>
      </div>
      <div className={styles.rechartsWrapper}>
        {chartType === "bar" ? (
          <BarChart
            width={1000}
            margin={{ left: 2, right: 10, top: 10, bottom: 5 }}
            padding={{ top: 10 }}
            height={400}
            data={calculatedPopulations}
          >
            <XAxis
              dataKey="year"
              stroke="var(--text-color)"
              tick={{ fill: "var(--text-color)" }}
            />
            <YAxis
              domain={[0, maxPopulation + 10000000]}
              tickFormatter={(value) =>
                numeral(value).format("0a").toUpperCase()
              }
              tick={{ fill: "var(--text-color)" }}
            />
            <Tooltip
              labelFormatter={(label) => `Year: ${label}`}
              formatter={(value) => numeral(value).format("0,0")}
            />
            <CartesianGrid
              stroke="var(--selected-color)"
              strokeDasharray="5 5"
            />
            <Bar dataKey="populations" fill="var(--nav-bg)" barSize={30} />
          </BarChart>
        ) : (
          <LineChart
            width={1050}
            height={400}
            data={calculatedPopulations}
            margin={{ top: 10, right: 10, bottom: 5, left: 2 }}
          >
            <Line
              type="monotone"
              dataKey="populations"
              stroke="var(--nav-bg)"
              strokeWidth={3}
              dot={{ fill: "var(--selected-color)", r: 5 }}
            />
            <CartesianGrid
              stroke="var(--selected-color)"
              strokeDasharray="5 5"
            />
            <XAxis dataKey="year" tick={{ fill: "var(--text-color)" }} />
            <YAxis
              domain={[0, maxPopulation + 10000000]}
              tickFormatter={(value) =>
                numeral(value).format("0a").toUpperCase()
              }
              tick={{ fill: "var(--text-color)" }}
            />
            <Tooltip
              labelFormatter={(label) => `Year: ${label}`}
              formatter={(value) => [
                numeral(value).format("0,0"),
                "Population",
              ]}
            />
          </LineChart>
        )}
      </div>
    </div>
  );
}
