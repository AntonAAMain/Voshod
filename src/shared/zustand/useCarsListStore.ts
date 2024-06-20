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

  handleBrands: (value: ICarBrand) => void;
  handleModels: (value: string) => void;
  handleFares: (value: string) => void;

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
      set((state) => {
        if (direction === "left" && get().page > 1) {
          state.page -= 1;
        }

        if (direction === "right" && get().page < get().pages) {
          state.page += 1;
        }
      });

      setPageToLs(get().page);
      get().fetchCars();
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

    handleBrands: (value: ICarBrand) => {
      if (value === ICarBrand.Все)
        set((state) => {
          state.brands = [ICarBrand.Все];
        });
      else {
        set((state) => {
          state.brands = get().brands.filter(
            (brand) => brand !== ICarBrand.Все
          );
          if (get().brands.includes(value)) {
            state.brands = get().brands.filter((brand) => brand !== value);
          } else state.brands.push(value);
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

      set((state) => {
        state.page = 1;
      });

      setModelsToLS(get().models);
      setBrandsToLS(get().brands);

      get().setDirectPage(1);
    },

    handleFares: (value: string) => {
      set((state) => {
        state.fares = get().fares.filter((fare) => fare !== "Все");
        if (get().fares.includes(value))
          state.fares = get().fares.filter((fare) => fare !== value);
        else state.fares.push(value);
      });

      if (value === "Все" || get().fares.length === 0) {
        set((state) => {
          state.fares = ["Все"];
        });
      }
      setTarifsToLS(get().fares);

      get().setDirectPage(1);
    },

    handleModels: (value: string) => {
      set((state) => {
        if (get().models.includes(value))
          state.models = get().models.filter((model) => model !== value);
        else state.models.push(value);
      });

      set((state) => {
        state.page = 1;
      });

      setModelsToLS(get().models);

      get().setDirectPage(1);
    },
  }))
);
