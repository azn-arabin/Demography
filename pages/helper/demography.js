const validateInputs = (data) => {
  const errors = [];

  if (!data.child) {
    errors.push({ name: "Child", message: "Child is required." });
  } else if (isNaN(data.child)) {
    errors.push({ name: "Child", message: "Child must be a number." });
  } else if (data.child < 0 || data.child > 10) {
    errors.push({
      name: "Child",
      message: "Child must be a positive number and less than 10.",
    });
  }

  if (!data.year) {
    errors.push({ name: "Year", message: "Year is required." });
  } else if (isNaN(data.year)) {
    errors.push({ name: "year", message: "Year must be a number." });
  } else if (data.year < 2012 || data.year > 2101) {
    errors.push({
      name: "Year",
      message: "The year must be between 2012 and 2101.",
    });
  }

  return errors;
};

export default validateInputs;
