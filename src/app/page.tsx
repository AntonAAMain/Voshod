import { CarFilters } from "@/components/widgets/CarFilters/CarFilters";
import { CarsList } from "@/components/widgets/CarsList/CarsList";
import { Pagination } from "@/components/features/PageSelect/Pagination";

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Автопарк Восход</h1>

      <CarFilters />
      <CarsList />
      <Pagination />
    </main>
  );
}
