import { ICar } from "@/shared/types";
import Image from "next/image";

import cls from "./CarCard.module.scss";
import { Button } from "@mui/material";
import Link from "next/link";

interface Props {
  car: ICar;
}

export const CarCard = ({ car }: Props) => {
  // Картинку, бренд, модель, регистрационный номер, цену и тариф.

  return (
    <div className={cls.container}>
      <Link href={`/car/${car.id}`} passHref className={cls.viewBtnWrapper}>
        <Button className={cls.viewBtn} variant="contained" color="primary">
          Просмотр
        </Button>
      </Link>
      <div className={cls.content}>
        <div className={cls.photo}>
          {car.image && (
            <Image layout="fill" objectFit="contain" src={car.image} alt="" />
          )}
          {!car.image && (
            <div className={cls.emptyPhoto}> Фото в каталоге </div>
          )}
        </div>

        <div className={cls.content}>
          <div className={cls.name}>
            {car.brand} {car.model}
          </div>

          <div className={cls.registerNumber}>Рег. номер - {car.number}</div>

          <div className={cls.fare}>
            {car.tarif.length === 0 && "Тариф в каталоге"}
            {car.tarif.length > 0 && (
              <>
                <div className={cls.fareName}>Тариф:</div>
                <ul className={cls.fareValue}>
                  {car.tarif.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className={cls.price}>
            {car.price === 0
              ? "Цена в каталоге"
              : `${car.price / 1000000} млн ₽`}
          </div>
        </div>
      </div>
    </div>
  );
};
