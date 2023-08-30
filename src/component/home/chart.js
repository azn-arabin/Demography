"use client";
import React, { useEffect, useState } from "react";
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
import Division from "@/component/home/division";
import CustomTooltip from "@/component/home/custom-tooltip";
import DensityMap from "@/component/home/map";

export default function MyChart({
  predictedPopulations,
  currentYear,
  year,
  districtNames,
  divisionNames,
  child,
}) {
  const [chartType, setChartType] = useState("bar");
  const [district, setDistrict] = useState([]);
  const [division, setDivision] = useState([]);
  const [piChYear, setPiChYear] = useState(0);
  const [piChPopulations, setPiChPopulations] = useState(0);

  const maxPopulation = Math.max(
    ...predictedPopulations.map((data) => data.populations)
  );

  const populations = predictedPopulations.map((data) => {
    return {
      year: data.year,
      populations: data.populations,
    };
  });

  const handleDistrictDivision = (pop) => {
    const districtData = districtNames.map((district, index) => ({
      name: district.name,
      population: pop.district[index],
      division: district.division,
    }));
    setDistrict(districtData);
    const divisionData = divisionNames.map((name, index) => ({
      name,
      population: pop.division[index],
    }));
    setDivision(divisionData);
    setPiChPopulations(pop.populations);
    setPiChYear(pop.year);
  };

  useEffect(() => {
    handleDistrictDivision(
      predictedPopulations[predictedPopulations.length - 1]
    );
  }, [predictedPopulations]);

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
            data={populations}
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
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid
              stroke="var(--selected-color)"
              strokeDasharray="5 5"
            />
            <Bar
              dataKey="populations"
              fill="var(--nav-bg)"
              barSize={30}
              onClick={(data, index) =>
                handleDistrictDivision(predictedPopulations[index])
              }
            />
          </BarChart>
        ) : (
          <LineChart
            width={1050}
            height={400}
            data={populations}
            margin={{ top: 10, right: 10, bottom: 5, left: 2 }}
          >
            <Line
              type="monotone"
              dataKey="populations"
              stroke="var(--nav-bg)"
              strokeWidth={3}
              dot={{
                fill: "var(--selected-color)",
                r: 5,
              }}
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
            <Tooltip content={<CustomTooltip />} />
          </LineChart>
        )}
      </div>
      <DensityMap
        division={division}
        year={piChYear}
        child={child}
        populations={piChPopulations}
      />
      <Division
        division={division}
        district={district}
        year={piChYear}
        populations={piChPopulations}
        child={child}
      />
    </div>
  );
}
