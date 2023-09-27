export const currentYear = 2011;

let totalPopulation = [];
let deathRates = [];
let infantMortality = [];
let migrations = [];
let districts = [];

let predictedData = [];

const shiftPopulations = (child, districtId, rateId) => {
  let index = 6;

  while (index > 4) {
    districts[districtId].ageGroups[index] =
      districts[districtId].ageGroups[index - 1] +
      (districts[districtId].ageGroups[index - 1] * migrations[rateId]) / 1000;
    index--;
  }

  // for age group 15-19, considering suicide rate
  districts[districtId].ageGroups[index] =
    districts[districtId].ageGroups[index - 1] -
    (districts[districtId].ageGroups[index - 1] * 3.61) / 100000;
  // for age group 15-19, considering migration rate
  districts[districtId].ageGroups[index] =
    districts[districtId].ageGroups[index - 1] +
    (districts[districtId].ageGroups[index - 1] * migrations[rateId]) / 1000;

  index--;
  // for age group 10-14, considering suicide rate
  districts[districtId].ageGroups[index] =
    districts[districtId].ageGroups[index - 1] -
    (districts[districtId].ageGroups[index - 1] * 3.61) / 100000;

  index--;
  while (index) {
    districts[districtId].ageGroups[index] =
      districts[districtId].ageGroups[index - 1];
    index--;
  }

  districts[districtId].ageGroups[index] = child;
};

const divideAgeGroup = (pop) => {
  const groups = [];

  let index = 7;

  for (let i = 0; i < index; i++) {
    groups.push((pop * totalPopulation[i].percentage) / 100);
  }

  return groups;
};

const divideDistrictsPopulation = () => {
  districts = districts.map((district) => {
    return {
      ...district,
      ageGroups: divideAgeGroup(district.population),
    };
  });
};

const pushToPredictedData = (year) => {
  // Calculate division populations
  const divisionPopulations = {};

  districts.forEach((district) => {
    if (!divisionPopulations[district.division]) {
      divisionPopulations[district.division] = 0;
    }
    divisionPopulations[district.division] += district.population;
  });

  const divisionPopulationsArray = Object.values(divisionPopulations);

  predictedData.push({
    year,
    populations: districts.reduce(
      (total, district) => total + district.population,
      0
    ),
    district: districts.map((district) => district.population),
    division: divisionPopulationsArray,
  });
};

export const calculatePopulations = (year, child) => {
  divideDistrictsPopulation();
  predictedData = [];
  pushToPredictedData(2011);

  let y = year;
  let i = 0;
  let temp;

  while (y >= 5) {
    districts.forEach((district, id) => {
      let newChild =
        ((0.64 * (district.ageGroups[6] / 2)) / 100) * ((60 * child) / 100);
      newChild +=
        ((4 * (district.ageGroups[5] / 2)) / 100) * ((65 * child) / 100);
      newChild +=
        ((20.36 * (district.ageGroups[4] / 2)) / 100) * ((65 * child) / 100);
      newChild += ((63 * (district.ageGroups[3] / 2)) / 100) * child;
      newChild += ((12 * (district.ageGroups[2] / 2)) / 100) * child;
      newChild -= (infantMortality[i] / 1000) * newChild;
      shiftPopulations(newChild, id, i);
      district.population += newChild;
      temp = district.population;
      district.population -= ((temp * deathRates[i]) / 1000) * 5;
      district.population += ((temp * migrations[i]) / 1000) * 5;
    });
    y -= 5;
    i++;
    pushToPredictedData(currentYear + year - y);
  }

  if (y) {
    districts.forEach((district) => {
      let newChild =
        (y / 5) *
        ((0.64 * (district.ageGroups[6] / 2)) / 100) *
        ((60 * child) / 100);
      newChild +=
        (y / 5) *
        ((4 * (district.ageGroups[5] / 2)) / 100) *
        ((65 * child) / 100);
      newChild +=
        (y / 5) *
        ((20.36 * (district.ageGroups[4] / 2)) / 100) *
        ((65 * child) / 100);
      newChild += (y / 5) * ((63 * (district.ageGroups[3] / 2)) / 100) * child;
      newChild += (y / 5) * ((12 * (district.ageGroups[2] / 2)) / 100) * child;
      newChild -= (infantMortality[i] / 1000) * newChild;
      district.population += newChild;
      temp = district.population;
      district.population -= ((temp * deathRates[i]) / 1000) * y;
      district.population += ((temp * migrations[i]) / 1000) * y;
    });
    pushToPredictedData(currentYear + year);
  }

  return predictedData;
};

export const setTotalPopulation = (data) => {
  totalPopulation = data;
};

export const setInfantMortality = (data) => {
  infantMortality = data;
};

export const setDeathRates = (data) => {
  deathRates = data;
};

export const setMigrations = (data) => {
  migrations = data;
};

export const setDistricts = (data) => {
  districts = data;
};
