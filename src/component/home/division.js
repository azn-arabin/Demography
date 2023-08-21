import React from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import styles from "@/styles/division.module.css";
import CustomTooltip from "@/component/home/custom-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge } from "@fortawesome/free-solid-svg-icons";
import Population from "@/component/home/population";

const District = ({ district, division, year, child, populations }) => {
  const divisionColors = [
    "#FF5733",
    "#0074D9",
    "#FFC300",
    "#3D9970",
    "#FF851B",
    "#B10DC9",
    "#39CCCC",
  ];

  const divisionColorMapping = {};
  division.forEach((entry, index) => {
    divisionColorMapping[entry.name] = divisionColors[index];
  });

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    name,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={name === "RAJSHAHI" ? x - 30 : x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {name}
      </text>
    );
  };

  const renderLabelForDistrict = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    name,
    fill,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 70;
    let x = cx + radius * Math.cos(-midAngle * RADIAN);
    let y = cy + radius * Math.sin(-midAngle * RADIAN);

    const labelRadius = outerRadius + 20;
    const lineStartX = cx + labelRadius * Math.cos(-midAngle * RADIAN);
    const lineStartY = cy + labelRadius * Math.sin(-midAngle * RADIAN);

    if (index === 13 || index === 14) {
      return (
        <text
          x={x}
          y={y + (index - 12) * 20 - 20}
          fill={fill}
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {name}
        </text>
      );
    } else if (index > 40 && index < 50) {
      if (index === 49) {
        x -= 15;
        y -= 50;
      } else if (index === 48) {
        x -= 20;
        y -= 40;
      } else {
        y += (index - 40) * 10 - 50;
      }
      return (
        <>
          <line x1={x} y1={y} stroke={fill} x2={lineStartX} y2={lineStartY} />
          <text
            x={x}
            y={y}
            fill={fill}
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
          >
            {name}
          </text>
        </>
      );
    }

    return name;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <FontAwesomeIcon icon={faThLarge} />
        <h3>By Division and District</h3>
      </div>
      <div className={styles.container}>
        <div className={styles.popIndicator}>
          <Population
            title={`Year: ${year} & Child: ${child}`}
            predictor={"Total Predicted"}
          >
            {populations}
          </Population>
        </div>
      </div>
      <div className={styles.chartContainer}>
        <PieChart width={1020} height={950}>
          <Pie
            data={division}
            dataKey="population"
            cx="50%"
            cy="50%"
            outerRadius={250}
            fill="var(--hover-color)"
            label={renderCustomizedLabel}
          >
            {division.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={divisionColors[index % divisionColors.length]}
              />
            ))}
          </Pie>
          <Pie
            data={district}
            dataKey="population"
            cx="50%"
            cy="50%"
            innerRadius={260}
            outerRadius={370}
            label={renderLabelForDistrict}
          >
            {district.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={divisionColorMapping[entry.division]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </div>
    </div>
  );
};

export default District;
