import validateInputs from "../../src/helper/demography";
import connectToDatabase from "../../src/helper/db";

const DEBUG = false;
const currentYear = 2011;

let populations = [];
let deathRates = [];
let infantMortality = [];

const coupleYear = 20;

let currentPopulations = 0;

let calculatedPopulations = [];

function shiftPopulations(child) {
  let index = Math.floor(coupleYear / 5);

  while (index) {
    populations[index] = populations[index - 1];
    index--;
  }

  populations[index] = child;

  if (DEBUG) {
    for (let i = 0; i < populations.length; i++) {
      console.log(`(${i * 5} to ${(i + 1) * 5 - 1}) ---  ${populations[i]}`);
    }
    console.log();
  }
}

function calculatePopulations(year, child) {
  let updatedPopulations = currentPopulations;
  let deathPopulations = 0;
  let y = year;
  let i = 0;
  let index = Math.floor(coupleYear / 5);

  while (y >= 5) {
    // half of the total people
    let newChild = (populations[index] / 2) * child;
    newChild -= (infantMortality[i] / 1000) * newChild * 5;
    shiftPopulations(newChild);
    updatedPopulations += newChild;
    deathPopulations = ((updatedPopulations * deathRates[i]) / 1000) * 5;

    if (DEBUG) {
      console.log(
        `Death: ${deathPopulations}... Death rate: ${deathRates[i].toFixed(2)}`
      );
      console.log(`Updated: ${updatedPopulations}`);
    }

    updatedPopulations -= deathPopulations;
    y -= 5;
    i++;
    calculatedPopulations.push({
      year: currentYear + year - y,
      populations: updatedPopulations.toFixed(0),
    });
  }

  if (y) {
    let newChild = (y / 5) * (populations[index] / 2) * child;
    if (DEBUG) console.log(`New child: ${newChild.toFixed(2)}`);
    newChild -= (infantMortality[i] / 1000) * newChild * y;
    // updatePopulations(newChild);
    updatedPopulations += newChild;
    deathPopulations = ((updatedPopulations * deathRates[i]) / 1000) * y;

    if (DEBUG) console.log(`Death: ${deathPopulations}`);
    updatedPopulations -= deathPopulations;
    calculatedPopulations.push({
      year: currentYear + year,
      populations: updatedPopulations.toFixed(0),
    });
  }

  if (DEBUG) {
    console.log(`Updated without death: ${updatedPopulations}`);
    console.log(`Death: ${deathPopulations}`);
    console.log(`Updated: ${updatedPopulations - deathPopulations}`);
    console.log(`Year = ${year}`);
  }

  return updatedPopulations;
}

const demography = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: {
        message: "Method Not Allowed.",
      },
    });
  }

  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer ", "");

  if (token !== process.env.NEXT_PUBLIC_AUTHENTICATION_KEY) {
    return res.status(401).json({
      error: {
        message: "Unauthenticated!",
      },
    });
  }

  const { child, year } = req.body;

  const errors = validateInputs({ child, year });

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const db = await connectToDatabase();

  try {
    const populationData = await db
      .collection("population")
      .findOne({}, { projection: { "populations.amount": 1, _id: 0 } });

    populations = populationData.populations.map((item) => item.amount);

    currentPopulations = populations
      .slice()
      .reduce((sum, amount) => sum + amount, 0);

    const deathData = await db
      .collection("population")
      .findOne({}, { projection: { "deathRates.amount": 1, _id: 0 } });

    deathRates = deathData.deathRates.map((item) => item.amount);

    const mortalityData = await db
      .collection("population")
      .findOne({}, { projection: { "infantMortality.amount": 1, _id: 0 } });

    infantMortality = mortalityData.infantMortality.map((item) => item.amount);

    calculatedPopulations = [];
    calculatedPopulations.push({
      year: 2011,
      populations: 144043697,
    });
    const updatedPopulations = calculatePopulations(year - currentYear, child);

    return res.status(200).json({
      year,
      child,
      updatedPopulations,
      p2011: 144043697,
      p2022: 165158616,
      currentYear,
      calculatedPopulations,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: {
        message: "Internal server error.",
      },
    });
  }
};

export default demography;
