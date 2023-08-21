import React from "react";
import styles from "@/styles/home.module.css";
import Population from "@/component/home/population";

const Populations = ({ p2011, p2022, year, child, updatedPopulations }) => {
  return (
    <div className={styles.populations}>
      <Population
        title={`Year: ${year} & Child: ${child}`}
        predictor={"Predicted Population"}
      >
        {updatedPopulations.toFixed(0)}
      </Population>{" "}
      <Population title={"Population at 2022"} predictor={"From 2022 Census"}>
        {p2022}
      </Population>
      <Population title={"Population at 2011"} predictor={"From 2011 Census"}>
        {p2011}
      </Population>
    </div>
  );
};

export default Populations;
