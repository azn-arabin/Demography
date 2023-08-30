export const currentYear = 2011;

let totalPopulation = [];
let deathRates = [];
let infantMortality = [];
let migrations = [];
let districts = [];

const coupleYear = 20;

let predictedData = [];

const shiftPopulations = (child, districtId, rateId) => {
  let index = Math.floor(coupleYear / 5);

  // for age group 15-19, considering suicide rate
  districts[districtId].ageGroups[index] =
    districts[districtId].ageGroups[index - 1] -
    (districts[districtId].ageGroups[index - 1] * 3.61) / 100000;
  // for age group 15-19, considering migration rate
  districts[districtId].ageGroups[index] +=
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

  let index = Math.floor(coupleYear / 5) + 1;

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
  let index = Math.floor(coupleYear / 5);
  let temp;

  while (y >= 5) {
    districts.forEach((district, id) => {
      let newChild = (district.ageGroups[index] / 2) * child;
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
      let newChild = (y / 5) * (district.ageGroups[index] / 2) * child;
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
