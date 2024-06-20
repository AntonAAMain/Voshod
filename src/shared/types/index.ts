export enum ICarBrand {
  BMW = "BMW",
  Chery = "Chery",
  EXEED = "EXEED",
  Geely = "Geely",
  Hyundai = "Hyundai",
  Kia = "Kia",
  Renault = "Renault",
  Toyota = "Toyota",
  Все = "Все",
}

export type ICarFare = "13" | "14" | "22" | "26" | "0";

export const carFareObj: { [key: string]: ICarFare } = {
  "Комфорт+": "13",
  Комфорт: "14",
  Комфорт2: "22",
  Комфорт3: "26",
  Все: "0",
};

export const carFaresNames = Object.keys(carFareObj);
export const carFaresValues = Object.values(carFareObj);

export interface ICar {
  id: number;
  brand: ICarBrand;
  model: "X5";
  number: string;
  price: number;
  image?: string;
  images?: { id: string; image: string }[];
  tarif: string[];
}

type BrandModelsType = {
  [key: string]: string[];
};

export const brandModels: BrandModelsType = {
  BMW: ["X2", "X5"],
  Chery: [
    "Arrizo 8",
    "Tiggo 4",
    "Tiggo 7 Pro",
    "Tiggo 7 Pro Max",
    "Tiggo 8 Pro Max",
  ],
  EXEED: ["LX", "TXL", "VX"],
  Geely: ["Coolray"],
  Hyundai: ["Sonata"],
  Kia: ["K5", "Optima", "Rio"],
  Renault: ["Logan"],
  Toyota: ["Camry"],
};

export const allCarsBrands = [
  ICarBrand.Все,
  ICarBrand.BMW,
  ICarBrand.Chery,
  ICarBrand.EXEED,
  ICarBrand.Geely,
  ICarBrand.Hyundai,
  ICarBrand.Kia,
  ICarBrand.Renault,
  ICarBrand.Toyota,
];

export const allCarsValues = ["13", "14", "22", "26"];

export const filterModelsByBrand = (brandList: string[]): string[] => {
  const filteredModels: string[] = [];

  for (const brand of brandList) {
    if (brandModels[brand]) {
      filteredModels.push(...brandModels[brand]);
    }
  }

  return filteredModels;
};
