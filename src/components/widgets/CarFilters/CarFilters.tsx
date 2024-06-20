"use client";

import { useCarsListStore } from "@/shared/zustand/useCarsListStore";
import {
  ICarBrand,
  allCarsBrands,
  brandModels,
  carFaresNames,
  filterModelsByBrand,
} from "@/shared/types";
import { useEffect } from "react";
import { Selecting } from "./Selecting/Selecting";

import cls from "./CarFilters.module.scss";
import { MuiSelect } from "@/components/ui/MuiSelect/MuiSelect";

export const CarFilters = () => {
  const {
    brands,
    fares,
    models,
    fetchCars,
    handleBrands,
    handleFares,
    handleModels,
  } = useCarsListStore();

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className={cls.container}>
      <MuiSelect
        onChange={handleBrands}
        values={allCarsBrands}
        names={allCarsBrands}
        current={brands}
        label="Марки"
      />

      <MuiSelect
        onChange={handleModels}
        values={
          brands.includes(ICarBrand.Все)
            ? filterModelsByBrand(allCarsBrands)
            : filterModelsByBrand(brands)
        }
        names={
          brands.includes(ICarBrand.Все)
            ? filterModelsByBrand(allCarsBrands)
            : filterModelsByBrand(brands)
        }
        current={models}
        label="Модели"
      />

      <MuiSelect
        onChange={handleFares}
        values={carFaresNames}
        names={carFaresNames}
        current={fares}
        label="Тариф"
      />
    </div>
  );
};
