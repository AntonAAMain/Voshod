"use client";

import { useCarsListStore } from "@/shared/zustand/useCarsListStore";
import { CarCard } from "./CarCard/CarCard";
import cn from "classnames";

import cls from "./CarsList.module.scss";

export const CarsList = () => {
  const { cars, page, isLoading } = useCarsListStore();

  return (
    <div className={cn(cls.container, { [cls.container_hidden]: isLoading })}>
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}

      {cars.length === 0 && !isLoading && (
        <div className={cls.emptyResult}>Нет машин по вашему запросу</div>
      )}
    </div>
  );
};
