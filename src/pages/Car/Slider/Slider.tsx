import { Button } from "@mui/material";
import { useState } from "react";
import Image from "next/image";
import cn from "classnames";

import cls from "./Slider.module.scss";

interface Props {
  images?: { id: string; image: string }[];
}

export const Slider = ({ images }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleBtnClick = (index: number) => setActiveIndex(index);

  return (
    <div className={cls.container}>
      {images && (
        <>
          <div className={cls.photo}>
            {images.map((image, index) => (
              <div className={cls.imageWrapper} key={image.id}>
                <Image
                  className={cn(cls.image, {
                    [cls.image_active]: index === activeIndex,
                  })}
                  layout="fill"
                  objectFit="contain"
                  src={image.image}
                  alt=""
                />
              </div>
            ))}
          </div>

          {images.length > 1 && (
            <div className={cls.buttons}>
              {images.map((btn, index) => (
                <Button
                  className={cls.button}
                  onClick={() => handleBtnClick(index)}
                  variant={index === activeIndex ? "contained" : "outlined"}
                  color="secondary"
                  key={btn.id}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
