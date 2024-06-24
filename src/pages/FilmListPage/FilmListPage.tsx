import { default as React, useContext } from "react";
import styles from "./filmlistpage.css";
import { FilmCard } from "@ui/FilmCard";
import { FilmFilterContext } from "@src/contexts/FilmFilterContext";
import { PageBtnsBlock } from "@pages/PageBtnsBlock";

export const FilmListPage = () => {
  const {
    filmList,
    favFilmsIds,
    isFilmListFetching,
    isFilmListError,
    isEmptyFavouritesPage,
  } = useContext(FilmFilterContext);

  if (!filmList?.docs.length || isEmptyFavouritesPage) {
    return <span>Ничего не найдено</span>;
  }

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
