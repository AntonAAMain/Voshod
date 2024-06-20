"use client";

import { useCarsListStore } from "@/shared/zustand/useCarsListStore";
import { MuiSelect } from "@/components/ui/MuiSelect/MuiSelect";
import {
  ICarBrand,
  allCarsBrands,
  brandModels,
  carFaresNames,
  filterModelsByBrand,
} from "@/shared/types";
import { useEffect } from "react";

import cls from "./CarFilters.module.scss";
import { Selecting } from "./Selecting/Selecting";

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
      <Selecting<ICarBrand>
        allButtons={allCarsBrands}
        activeButtons={brands}
        onClick={handleBrands}
        title="Марки"
      />

      <Selecting<string>
        allButtons={filterModelsByBrand(brands)}
        activeButtons={models}
        onClick={handleModels}
        title="Модели"
      />

      <Selecting<string>
        allButtons={carFaresNames}
        activeButtons={fares}
        onClick={handleFares}
        title="Тарифы"
      />
    </div>
  );
};
