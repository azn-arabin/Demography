import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import numeral from "numeral";

const CountUpAnimation = ({ startValue, endValue }) => {
  const [currentValue, setCurrentValue] = useState(startValue);

  useEffect(() => {
    let intervalId;
    const step = Math.ceil((endValue - startValue) / 60); // Adjust the step value as needed

    if (startValue < endValue) {
      intervalId = setInterval(() => {
        setCurrentValue((prevValue) => {
          if (prevValue + step < endValue) {
            return prevValue + step;
          } else {
            clearInterval(intervalId);
            return endValue;
          }
        });
      }, 16); // Adjust the interval delay as needed
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [startValue, endValue]);

  useEffect(() => {
    setCurrentValue(startValue);
  }, [endValue]); // Reset the currentValue when endValue changes

  return <motion.h2>{numeral(currentValue).format("0,0")}</motion.h2>;
};

export default CountUpAnimation;
