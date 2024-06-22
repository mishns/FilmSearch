import { default as React, useContext } from "react";
import styles from "./filmlistpage.css";
import { FilmCard } from "@ui/FilmCard";
import { FilmFilterContext } from "@src/contexts/FilmFilterContext";
import useLocalStorageState from "use-local-storage-state";
import { PageBtnsBlock } from "@pages/PageBtnsBlock";

export const FilmListPage = () => {
  const {
    filmList,
    isFilmListFetching,
    isFilmListError,
    isEmptyFavouritesPage,
  } = useContext(FilmFilterContext);
  const [favFilmsIds] = useLocalStorageState<Array<number>>("favFilmsIds", {
    defaultValue: [],
  });

  return (
    <div className={styles.filmList}>
      <PageBtnsBlock />
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
      <PageBtnsBlock />
    </div>
  );
};
