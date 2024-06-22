import { default as React, FC, useContext } from "react";
import styles from "./pagebtnsblock.css";
import { FilmFilterContext } from "@src/contexts/FilmFilterContext";

export const PageBtnsBlock: FC = () => {
  const {
    filterData,
    isFilmListFetching,
    isDataEnd,
    isEmptyFavouritesPage,
    handlePrevPageClick,
    handleNextPageClick,
  } = useContext(FilmFilterContext);

  return (
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
        disabled={isFilmListFetching || isEmptyFavouritesPage || isDataEnd}
        onClick={handleNextPageClick}
      >
        Следующая
      </button>
    </div>
  );
};
