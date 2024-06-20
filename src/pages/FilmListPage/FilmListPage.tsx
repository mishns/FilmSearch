import { default as React, useContext } from "react";
import styles from "./filmlistpage.css";
import { FilmCard } from "@ui/FilmCard";
import { FilterFormPage } from "@pages/FilterFormPage";
import { FilmFilterContext } from "@src/contexts/FilmFilterContext";

export const FilmListPage = () => {
  const {
    filmList,
    filterData,
    isFilmListFetching,
    isFilmListError,
    handlePrevPageClick,
    handleNextPageClick,
  } = useContext(FilmFilterContext);
  return (
    <div className={styles.filmList}>
      <FilterFormPage />
      <div className={styles.pageNavBtns}>
        <button
          className={styles.pageBtn}
          disabled={filterData.page === 1 || isFilmListFetching}
          onClick={handlePrevPageClick}
        >
          Предыдущая
        </button>
        <button
          className={styles.pageBtn}
          disabled={isFilmListFetching}
          onClick={handleNextPageClick}
        >
          Слудующая
        </button>
      </div>

      {isFilmListError ? (
        <span>Film list loading error</span>
      ) : isFilmListFetching ? (
        <span>Loading...</span>
      ) : (
        filmList!.docs.map(film => {
          return <FilmCard key={film.id} film={film} />;
        })
      )}
    </div>
  );
};
