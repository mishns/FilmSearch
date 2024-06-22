import { default as React, FC, useContext, useEffect } from "react";
import styles from "./filmsearchpage.css";
import { FilmListPage } from "@pages/FilmListPage";
import { FilterFormPage } from "@pages/FilterFormPage";
import { FilmFilterContext } from "@src/contexts/FilmFilterContext";

export const FilmSearchPage: FC = () => {
  const { resetPage } = useContext(FilmFilterContext);
  useEffect(() => {
    return resetPage;
  }, []);
  return (
    <div className={styles.filmSearchPage}>
      <FilterFormPage />
      <FilmListPage />
    </div>
  );
};
