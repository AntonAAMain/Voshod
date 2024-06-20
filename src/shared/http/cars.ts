import { ICarBrand, ICarFare, carFareObj } from "../types";

export const carsListUrl = (
  brands: ICarBrand[],
  models: string[],
  fares: string[],
  page: number
) => {
  const startPath = "/?w=catalog-cars";

  const brandsPath = brands.includes(ICarBrand.Все)
    ? ""
    : brands.map((brand) => `&brand[]=${brand}`).join("");
  const modelsPath =
    models.length === 0
      ? ""
      : models.map((model) => `&model[]=${model}`).join("");
  const faresPath = !fares.includes(carFareObj["Все"])
    ? fares.map((fare) => `&tarif[]=${carFareObj[fare]}`).join("")
    : "";

  return `${startPath + brandsPath + modelsPath + faresPath}&page=${page}`;
};
