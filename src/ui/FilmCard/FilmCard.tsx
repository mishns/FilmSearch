import { default as React, FC, useContext } from "react";
import styles from "./filmcard.css";
import { Film } from "@api/Film";
import defaultPosterUrl from "@assets/img/no-poster.jpg";
import { Link } from "react-router-dom";
import { FilmFilterContext } from "@src/contexts/FilmFilterContext";
import classNames from "classnames";

interface FilmCardProps {
  film: Film;
  isFavourite: boolean;
  isFilmPage: boolean;
}

export const FilmCard: FC<FilmCardProps> = ({
  film,
  isFavourite,
  isFilmPage,
}) => {
  const { handleAddFavourite, handleDeleteFavourite } =
    useContext(FilmFilterContext);

  const {
    id,
    name,
    alternativeName,
    enName,
    poster,
    rating,
    year,
    genres,
    description,
    shortDescription,
  } = film;

  const filmName: string = name ?? alternativeName ?? enName ?? "Без названия";
  const filmYear: string = String(year) ?? "Год неизвестен";
  const filmRating: number = rating.kp ?? 0;
  const posterUrl = poster.url ?? poster.previewUrl ?? defaultPosterUrl;
  const filmDescription = description ?? shortDescription ?? "Без описания";

  const filmCardCls = classNames({
    [`${styles.filmCard}`]: true,
    [`${styles.filmPage}`]: isFilmPage,
  });

  const favButtonCls = classNames({
    [`${styles.favButton}`]: true,
    [`${styles.favButton_active}`]: isFavourite,
  });

  return (
    <div className={filmCardCls}>
      <img
        className={styles.filmPoster}
        src={posterUrl}
        onError={() => defaultPosterUrl}
        alt="filmPoster"
      />
      <div className={styles.filmInfo}>
        <div className={styles.filmCardHeader}>
          <h2 className={styles.filmName}>{filmName}</h2>
          <button
            className={favButtonCls}
            onClick={
              isFavourite
                ? () => handleDeleteFavourite(id)
                : () => handleAddFavourite(id)
            }
          >
            <svg
              className={styles.favouriteIcon}
              strokeWidth="3"
              version="1"
              viewBox="0 0 48 48"
              enableBackground="new 0 0 48 48"
              height="100%"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M34,9c-4.2,0-7.9,2.1-10,5.4C21.9,11.1,18.2,9,14,9C7.4,9,2,14.4,2,21c0,11.9,22,24,22,24s22-12,22-24 C46,14.4,40.6,9,34,9z"></path>
            </svg>
          </button>
        </div>
        <span>Рейтинг: {filmRating}</span>
        <span className={styles.filmYear}>Год: {filmYear}</span>
        <div className={styles.filmGenres}>
          {isFilmPage && genres && (
            <>
              <span>Жанры: </span>
              {genres.map((genre, index) => (
                <span key={index}>{`${genre.name} `}</span>
              ))}
            </>
          )}
        </div>
        {isFilmPage && (
          <span className={styles.filmDescr}>Описание: {filmDescription}</span>
        )}
        {!isFilmPage && (
          <Link to={`/${id}`} className={styles.moreLink}>
            Подробнее
          </Link>
        )}
      </div>
    </div>
  );
};
