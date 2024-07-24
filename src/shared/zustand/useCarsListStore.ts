import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import { ICar, ICarBrand, brandModels } from "../types";
import { apiBase } from "../http";
import { carsListUrl } from "../http/cars";
import {
  getBrandsFromLS,
  getModelsFromLS,
  getPageFromLS,
  getTarifsFromLS,
  setBrandsToLS,
  setModelsToLS,
  setPageToLs,
  setTarifsToLS,
} from "../localStorage";

interface StoreState {
  brands: ICarBrand[];
  models: string[];
  fares: string[];

  handleBrands: (value: string[]) => void;
  handleModels: (value: string[]) => void;
  handleFares: (value: string[]) => void;

  cars: ICar[];

  fetchCars: () => void;

  isLoading: boolean;
  isError: boolean;

  page: number;
  pages: number;
  setPage: (direction: "left" | "right") => void;
  setDirectPage: (value: number) => void;
}

export const useCarsListStore = create<StoreState>()(
  immer((set, get) => ({
    brands: [],
    models: [],
    fares: [],
    cars: [],

    page: 1,
    pages: 1,

    isError: false,
    isLoading: true,

    setDirectPage: (value: number) => {
      set((state) => {
        state.page = value;
      });

      setPageToLs(value);
      get().fetchCars();
    },

    setPage: (direction: "left" | "right") => {
      if (direction === "left" && get().page > 1) {
        set((state) => {
          state.page -= 1;
        });
        setPageToLs(get().page);
        get().fetchCars();
      }

      if (direction === "right" && get().page < get().pages) {
        set((state) => {
          state.page += 1;
        });
        setPageToLs(get().page);
        get().fetchCars();
      }
    },

    fetchCars: async () => {
      set((state) => {
        state.brands = getBrandsFromLS() as ICarBrand[];
        state.models = getModelsFromLS();
        state.fares = getTarifsFromLS();
        state.page = getPageFromLS();
      });

      const url = carsListUrl(
        get().brands,
        get().models,
        get().fares,
        get().page
      );

      set((state) => {
        state.isLoading = true;
      });

      await apiBase
        .get(url)
        .then(({ data }) => {
          set((state) => {
            state.isLoading = false;
            state.cars = data.list;
            state.page = parseInt(data.page);
            state.pages = data.pages;
          });
        })
        .catch(() => {
          set((state) => {
            state.isError = true;
          });
        });
    },

    handleBrands: (value: string[]) => {
      if (
        !get().brands.includes(ICarBrand.Все) &&
        value.includes(ICarBrand.Все)
      ) {
        set((state) => {
          state.brands = [ICarBrand.Все];
        });
      } else {
        set((state) => {
          state.brands = value.filter(
            (item) => item !== ICarBrand.Все
          ) as ICarBrand[];
        });
      }

      set((state) => {
        const possibleModels = get()
          .brands.map((brand) => brandModels[brand])
          .flat();

        state.models = get().models.filter((model) =>
          possibleModels.includes(model)
        );
      });

      setModelsToLS(get().models);
      setBrandsToLS(get().brands);

      get().setDirectPage(1);
    },

    handleFares: (value: string[]) => {
      if (!get().fares.includes("Все") && value.includes("Все")) {
        set((state) => {
          state.fares = ["Все"];
        });
      } else {
        set((state) => {
          state.fares = value.filter((item) => item !== "Все");
        });
      }

      setTarifsToLS(get().fares);

      get().setDirectPage(1);
    },

    handleModels: (value: string[]) => {
      set((state) => {
        state.models = value;
      });

      setModelsToLS(get().models);

      get().setDirectPage(1);
    },
  }))
);
