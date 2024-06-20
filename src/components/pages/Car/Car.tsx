"use client";

import { useEffect, useState } from "react";
import { ICar } from "@/shared/types";
import { apiBase } from "@/shared/http";
import cn from "classnames";
import { Button } from "@mui/material";
import Link from "next/link";

import cls from "./Car.module.scss";
import { Slider } from "@/components/widgets/Slider/Slider";

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
          {(car.images?.length === 0 || car.images === null) && (
            <div className={cls.emptyPhoto}> Фото в каталоге </div>
          )}
          {car?.number && (
            <div className={cls.number}>Рег. номер: {car.number}</div>
          )}
          {car.tarif.length > 0 && (
            <div className={cls.tarif}>
              <div className={cls.tarifName}>Тариф:</div>

              <ul className={cls.tarifList}>
                {car.tarif.map((tarif) => (
                  <li key={tarif}>- {tarif}</li>
                ))}
              </ul>
            </div>
          )}
          <Link href={"/"} passHref className={cls.link}>
            <Button className={cls.backBtn} variant="contained" color="primary">
              Назад
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};
