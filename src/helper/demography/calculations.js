export const currentYear = 2011;

let totalPopulation = [];
let deathRates = [];
let infantMortality = [];
let districts = [];

const coupleYear = 20;

let predictedData = [];

const shiftPopulations = (child, id) => {
  let index = Math.floor(coupleYear / 5);

  while (index) {
    districts[id].ageGroups[index] = districts[id].ageGroups[index - 1];
    index--;
  }

  districts[id].ageGroups[index] = child;
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

  let deathPopulations = 0;
  let y = year;
  let i = 0;
  let index = Math.floor(coupleYear / 5);

  while (y >= 5) {
    districts.forEach((district, id) => {
      let newChild = (district.ageGroups[index] / 2) * child;
      newChild -= (infantMortality[i] / 1000) * newChild * 5;
      shiftPopulations(newChild, id);
      district.population += newChild;
      deathPopulations = ((district.population * deathRates[i]) / 1000) * 5;
      district.population -= deathPopulations;
    });
    y -= 5;
    i++;
    pushToPredictedData(currentYear + year - y);
  }

  if (y) {
    districts.forEach((district) => {
      let newChild = (y / 5) * (district.ageGroups[index] / 2) * child;
      newChild -= (infantMortality[i] / 1000) * newChild * y;
      district.population += newChild;
      deathPopulations = ((district.population * deathRates[i]) / 1000) * y;
      district.population -= deathPopulations;
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

export const setDistricts = (data) => {
  districts = data;
};
