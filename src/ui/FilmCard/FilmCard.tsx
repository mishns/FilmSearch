import { default as React, FC } from "react";
import styles from "./filmcard.css";
import { FilmCardInfo } from "@api/Film";
import defaultPosterUrl from "@assets/img/no-poster.jpg";
import { Link } from "react-router-dom";

interface FilmCardProps {
  film: FilmCardInfo;
}

export const FilmCard: FC<FilmCardProps> = ({ film }) => {
  const { rating } = film;
  const filmName: string =
    film.name ?? film.alternativeName ?? film.enName ?? "Без названия";
  const filmYear: string = String(film.year) ?? "Год неизвестен";
  const filmRating: number = rating.kp ?? 0;
  const posterUrl =
    film.poster.url ?? film.poster.previewUrl ?? defaultPosterUrl;
  return (
    <div className={styles.filmCard}>
      <img
        className={styles.filmPoster}
        src={posterUrl}
        onError={() => defaultPosterUrl}
        alt="filmPoster"
      />
      <div className={styles.filmInfo}>
        <h2 className={styles.filmName}>{filmName}</h2>
        <span>Рейтинг: {filmRating}</span>
        <span className={styles.filmYear}>Год: {filmYear}</span>
        <Link to={`/${film.id}`} className={styles.moreLink}>
          Подробнее
        </Link>
      </div>
    </div>
  );
};
