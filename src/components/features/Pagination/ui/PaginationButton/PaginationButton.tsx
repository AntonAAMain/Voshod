import { ButtonHTMLAttributes } from "react";
import Image from "next/image";
import cn from "classnames";

import cls from "./PaginationButton.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLDivElement> {
  direction: "left" | "right";
  isActive: boolean;
}

export const PaginationButton = ({ direction, isActive, ...props }: Props) => {
  const path = "/images/common/arrow.svg";

  return (
    <div
      {...props}
      className={cn(cls.container, {
        [cls.left]: direction === "left",
        [cls.right]: direction === "right",
        [cls.container_active]: isActive,
      })}
    >
      <div className={cls.img}>
        <Image objectFit="contain" layout="fill" src={path} alt="" />
      </div>
    </div>
  );
};
