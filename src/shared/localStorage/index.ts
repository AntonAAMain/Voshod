import { ICarBrand, carFareObj } from "../types";

export const brandLS = "brand";
export const modelLS = "model";
export const tarifLS = "tarif";
export const pageLS = "page";

/// SETTING

export const setBrandsToLS = (brands: ICarBrand[]): void => {
  const joined = brands.join("/");

  localStorage.setItem(brandLS, joined);
};

export const setModelsToLS = (models: string[]): void => {
  const joined = models.join("/");

  localStorage.setItem(modelLS, joined);
};

export const setTarifsToLS = (tarifs: string[]): void => {
  const joined = tarifs.join("/");

  localStorage.setItem(tarifLS, joined);
};

export const setPageToLs = (page: string | number): void => {
  localStorage.setItem(pageLS, page.toString());
};

/// GETTING

export const getBrandsFromLS = (): string[] => {
  const joined = localStorage.getItem(brandLS);

  if (!joined) {
    return [ICarBrand.Все];
  } else return joined?.split("/");
};

export const getModelsFromLS = (): string[] => {
  const joined = localStorage.getItem(modelLS);

  if (!joined) {
    return [];
  } else return joined?.split("/");
};

export const getTarifsFromLS = (): string[] => {
  const joined = localStorage.getItem(tarifLS);

  if (!joined) {
    return ["Все"];
  } else return joined.split("/");
};

export const getPageFromLS = (): number => {
  const storagedPage = localStorage.getItem(pageLS);

  if (!storagedPage) return 1;
  else return parseInt(storagedPage);
};
