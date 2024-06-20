import { Button } from "@mui/material";

import cls from "./Selecting.module.scss";

interface Props<T> {
  allButtons: T[];
  activeButtons: T[];
  onClick: (value: T) => void;
  title: string;
}

export const Selecting = <T,>({
  allButtons,
  activeButtons,
  onClick,
  title,
}: Props<T>) => {
  return (
    <div className={cls.container}>
      <div className={cls.title}>{title}</div>
      <div className={cls.list}>
        {allButtons.map((btn) => (
          <Button
            onClick={() => onClick(btn)}
            className={cls.btn}
            key={btn as string}
            variant={activeButtons.includes(btn) ? "contained" : "outlined"}
            color="secondary"
          >
            {`${btn}`}
          </Button>
        ))}
      </div>
      <div className={cls.emptyText}>
        {allButtons.length === 0 && "Выберите марку"}
      </div>
    </div>
  );
};
