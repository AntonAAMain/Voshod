"use client";

import { PaginationButton } from "./ui/PaginationButton/PaginationButton";
import { useCarsListStore } from "@/shared/zustand/useCarsListStore";
import cn from "classnames";

import cls from "./Pagination.module.scss";

export const Pagination = () => {
  const limit = 10;
  const { page, pages, setPage, cars, isLoading } = useCarsListStore();

  return (
    <div
      className={cn(cls.container, {
        [cls.container_hidden]: cars.length === 0 || isLoading,
      })}
    >
      <div className={cn(cls.perPage)}>
        <div>Просмотр по 10 элементов</div>
      </div>

      <div className={cls.pages}>
        <div className={cls.counter}>
          {page} из {pages}
        </div>

        <div className={cls.buttons}>
          <PaginationButton
            isActive={page > 1}
            onClick={() => setPage("left")}
            direction="left"
          />

          <PaginationButton
            isActive={page < pages}
            onClick={() => setPage("right")}
            direction="right"
          />
        </div>
      </div>
    </div>
  );
};
