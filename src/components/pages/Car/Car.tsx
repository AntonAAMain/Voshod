"use client";

import { useEffect, useState } from "react";
import cls from "./Car.module.scss";
import { ICar } from "@/shared/types";
import axios from "axios";
import { strict } from "assert";
import { apiBase } from "@/shared/http";
import { Slider } from "./Slider/Slider";
import cn from "classnames";

interface Props {
  id: string;
}

export const CarPage = ({ id }: Props) => {
  const [car, setCar] = useState<ICar | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    apiBase
      .get(`?w=catalog-car&id=${id}`)
      .then(({ data }) => {
        setCar(data.item);
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  return (
    <div className={cn(cls.container, { [cls.container_hidden]: isLoading })}>
      {!isLoading && car !== null && (
        <>
          <div className={cls.name}>
            {car.brand} {car.model} - {`${car.price / 1000000} млн ₽`}
          </div>
          <Slider images={car.images} />

          {car?.number && (
            <div className={cls.number}>Рег. номер: {car.number}</div>
          )}
          <div className={cls.tarif}>
            <div className={cls.tarifName}>Тариф:</div>

            <ul className={cls.tarifList}>
              {car.tarif.map((tarif) => (
                <li key={tarif}>- {tarif}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
