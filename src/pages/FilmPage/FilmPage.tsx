import { default as React, FC, useContext } from "react";
import styles from "./filmpage.css";
import { useParams } from "react-router-dom";
import { fetchFilmById } from "@api/Film";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@api/queryClient";
import { FilmCard } from "@ui/FilmCard";
import { FilmFilterContext } from "@src/contexts/FilmFilterContext";

export const FilmPage: FC = () => {
  const { id: filmId } = useParams();
  const {
    data: film,
    isError: isFilmError,
    isFetching: isFilmFetching,
  } = useQuery(
    {
      queryKey: ["daysStat"],
      queryFn: () => fetchFilmById(+filmId!),
    },
    queryClient,
  );
  const { favFilmsIds } = useContext(FilmFilterContext);

  if (isFilmFetching) {
    return <span>Loading</span>;
  }

  if (isFilmError || !film) {
    return <span>Loading film page error</span>;
  }

  return (
    <div className={styles.filmPage}>
      <FilmCard
        film={film}
        isFavourite={favFilmsIds.includes(film.id)}
        isFilmPage
      />
    </div>
  );
};
