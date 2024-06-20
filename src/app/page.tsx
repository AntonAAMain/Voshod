import { Pagination } from "@/components/features/Pagination/Pagination";
import { CarFilters } from "@/components/widgets/CarFilters/CarFilters";
import { CarsList } from "@/components/widgets/CarsList/CarsList";

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <CarFilters />
      <CarsList />
      <Pagination />
    </main>
  );
}
