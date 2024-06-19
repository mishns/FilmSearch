import { default as React, FC } from "react";
import styles from "./filmpage.css";
import { useParams } from "react-router-dom";
import { fetchFilmById } from "@api/Film";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@api/queryClient";
import defaultPosterUrl from "@assets/img/no-poster.jpg";

export const FilmPage: FC = () => {
  const { id: filmId } = useParams();
  const {
    data: filmData,
    isError: isFilmError,
    isFetching: isFilmFetching,
  } = useQuery(
    {
      queryKey: ["daysStat"],
      queryFn: () => fetchFilmById(+filmId!),
    },
    queryClient,
  );

  let filmName: string = "Без названия";
  let filmYear: string = "Год неизвестен";
  let filmRating: number = 0;
  let filmDescription: string = "Без описания";
  let posterUrl: string = defaultPosterUrl;

  if (isFilmFetching) {
    return <span>Loading</span>;
  }

  if (isFilmError || !filmData) {
    return <span>Loading film page error</span>;
  }

  if (!isFilmFetching && !isFilmError) {
    const film = filmData;
    const { rating } = film;
    filmName =
      film.name ?? film.alternativeName ?? film.enName ?? "Без названия";
    filmYear = String(film.year) ?? "Год неизвестен";
    filmRating = rating.kp ?? 0;
    filmDescription =
      film.description ?? film.shortDescription ?? "Без описания";
    posterUrl = film.poster.url ?? film.poster.previewUrl ?? defaultPosterUrl;
  }

  return (
    <div className={styles.filmPage}>
      <div className={styles.filmCard}>
        <img
          className={styles.filmPoster}
          src={posterUrl}
          onError={defaultPosterUrl}
          alt="filmPoster"
        />
        <div className={styles.filmInfo}>
          <h2 className={styles.filmName}>{filmName}</h2>
          <span>Рейтинг: {filmRating}</span>
          <span>Год: {filmYear}</span>
          <div className={styles.filmGenres}>
            <span>Жанры: </span>
            {filmData?.genres.map((genre, index) => (
              <span key={index}>{`${genre.name} `}</span>
            ))}
          </div>
          <span className={styles.filmDescr}>Описание: {filmDescription}</span>
        </div>
      </div>
    </div>
  );
};
