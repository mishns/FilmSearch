import { default as React, useContext } from "react";
import styles from "./filmlistpage.css";
import { FilmCard } from "@ui/FilmCard";
import { FilterFormPage } from "@pages/FilterFormPage";
import { FilmFilterContext } from "@src/contexts/FilmFilterContext";
import useLocalStorageState from "use-local-storage-state";

export const FilmListPage = () => {
  const {
    filmList,
    filterData,
    isFavFilter,
    isFilmListFetching,
    isFilmListError,
    handlePrevPageClick,
    handleNextPageClick,
  } = useContext(FilmFilterContext);
  const [favFilmsIds] = useLocalStorageState<Array<number>>("favFilmsIds", {
    defaultValue: [],
  });

  const isEmptyFavouritesPage = isFavFilter && !favFilmsIds.length;

  return (
    <div className={styles.filmList}>
      <FilterFormPage />
      <div className={styles.pageNavBtns}>
        <button
          className={styles.pageBtn}
          disabled={
            filterData.page === 1 || isFilmListFetching || isEmptyFavouritesPage
          }
          onClick={handlePrevPageClick}
        >
          Предыдущая
        </button>
        <button
          className={styles.pageBtn}
          disabled={isFilmListFetching || isEmptyFavouritesPage}
          onClick={handleNextPageClick}
        >
          Следующая
        </button>
      </div>

      {isFilmListError ? (
        <span>Film list loading error</span>
      ) : isFilmListFetching ? (
        <span>Loading...</span>
      ) : isEmptyFavouritesPage ? null : (
        filmList!.docs.map(film => {
          return (
            <FilmCard
              key={film.id}
              film={film}
              isFavourite={favFilmsIds.includes(film.id)}
              isFilmPage={false}
            />
          );
        })
      )}
    </div>
  );
};
