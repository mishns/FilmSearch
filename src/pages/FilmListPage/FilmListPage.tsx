import { default as React, useEffect, useState } from "react";
import styles from "./filmlistpage.css";
import { FilmCard } from "@ui/FilmCard";
import { FilterForm, FilterFormPage } from "@pages/FilterFormPage";
import { useQuery } from "@tanstack/react-query";
import { fetchFilmList } from "@api/Film";
import { queryClient } from "@api/queryClient";

const genresDict = {
  actionMovie: "боевик",
  thriller: "триллер",
  detective: "детектив",
  documentary: "документальный",
  biography: "биография",
};

const today = new Date();
const currYear = today.getFullYear();

export const FilmListPage = () => {
  const [page, setPage] = useState<string>("1");
  const [genres, setGenres] = useState<Array<string>>([]);
  const [rating, setRating] = useState<Array<string>>(["1", "10"]);
  const [years, setYears] = useState<Array<string>>([
    "1990",
    currYear.toString(),
  ]);
  const {
    data: filmList,
    isFetching: isFilmListFetching,
    isError: isFilmListError,
  } = useQuery(
    {
      queryFn: () =>
        fetchFilmList({
          page,
          limit: "50",
          sortField: "rating.kp",
          sortType: "-1",
          genres: genres,
          rating: { min: rating[0], max: rating[1] },
          years: { first: years[0], last: years[1] },
        }),
      queryKey: ["filmList"],
    },
    queryClient,
  );

  function handleFilterSubmit(formData: FilterForm) {
    const filterGenres = [];
    for (const key in formData) {
      if (key in genresDict) {
        if (formData[key as keyof typeof formData] === true) {
          filterGenres.push(genresDict[key as keyof typeof genresDict]);
        }
      }
    }

    setGenres(filterGenres);
    setRating([formData.minRating, formData.maxRating]);
    setYears([formData.firstYear, formData.lastYear]);
  }

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["filmList"] });
  }, [page, genres, rating, years]);

  return (
    <div className={styles.filmList}>
      <FilterFormPage handleFilterSubmit={handleFilterSubmit} />
      <div className={styles.pageNavBtns}>
        <button
          className={styles.pageBtn}
          disabled={page === "1" || isFilmListFetching}
          onClick={() => setPage(String(+page - 1))}
        >
          Предыдущая
        </button>
        <button
          className={styles.pageBtn}
          disabled={isFilmListFetching}
          onClick={() => setPage(String(+page + 1))}
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
