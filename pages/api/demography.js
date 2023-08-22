import validateInputs from "@/helper/demography/validation";
import connectToDatabase from "../../src/helper/db";
import {
  calculatePopulations,
  currentYear,
  setDeathRates,
  setDistricts,
  setInfantMortality,
  setMigrations,
  setTotalPopulation,
} from "@/helper/demography/calculations";

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
      .findOne({}, { projection: { populations: 1, _id: 0 } });

    setTotalPopulation(populationData.populations);

    const deathData = await db
      .collection("population")
      .findOne({}, { projection: { "deathRates.amount": 1, _id: 0 } });

    setDeathRates(deathData.deathRates.map((item) => item.amount));

    const mortalityData = await db
      .collection("population")
      .findOne({}, { projection: { "infantMortality.amount": 1, _id: 0 } });

    setInfantMortality(
      mortalityData.infantMortality.map((item) => item.amount)
    );

    const migrationsData = await db
      .collection("population")
      .findOne({}, { projection: { "migrations.amount": 1, _id: 0 } });

    setMigrations(migrationsData.migrations.map((item) => item.amount));

    const districtsData = await db
      .collection("population")
      .findOne({}, { projection: { districts: 1, _id: 0 } });
    setDistricts(districtsData.districts);

    const predictedPopulations = calculatePopulations(
      year - currentYear,
      child
    );

    const districtNames = districtsData.districts.map((district) => ({
      name: district.name,
      division: district.division,
    }));

    const divisionNamesSet = new Set(
      districtsData.districts.map((district) => district.division)
    );
    const divisionNames = Array.from(divisionNamesSet);

    return res.status(200).json({
      year,
      child,
      p2022: 165158616,
      currentYear,
      districtNames,
      divisionNames,
      predictedPopulations,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: "Internal server error.",
      },
    });
  }
};

export default demography;
