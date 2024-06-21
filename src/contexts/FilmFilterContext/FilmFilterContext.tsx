import {
  default as React,
  FC,
  createContext,
  useState,
  useEffect,
} from "react";
import { FilterForm } from "@pages/FilterFormPage";
import { queryClient } from "@api/queryClient";
import { useQuery } from "@tanstack/react-query";
import { fetchFilmList, FilmList } from "@api/Film";
import { useLocalStorage } from "@uidotdev/usehooks";

const today = new Date();
const currYear = today.getFullYear();

const genresDict = {
  actionMovie: "боевик",
  thriller: "триллер",
  detective: "детектив",
  documentary: "документальный",
  biography: "биография",
};

function getGenresRuList(genres: Genres) {
  const genresRuList: Array<string> = [];
  for (const [key, value] of Object.entries(genres)) {
    if (value) {
      genresRuList.push(genresDict[key as keyof typeof genresDict]);
    }
  }
  return genresRuList;
}

type Genres = {
  actionMovie: boolean;
  thriller: boolean;
  detective: boolean;
  documentary: boolean;
  biography: boolean;
};

type Rating = {
  minRating: number;
  maxRating: number;
};

type Years = {
  firstYear: number;
  lastYear: number;
};

export type FilmFilter = {
  page: number;
  genres: Genres;
  rating: Rating;
  years: Years;
};

interface FilmFilterContextProviderProps {
  children?: React.ReactNode;
}

type FilmFilterContextValue = {
  filmList: FilmList | undefined;
  filterData: FilmFilter;
  isFavFilter: boolean;
  isFilmListFetching: boolean;
  isFilmListError: boolean;
  handleFilterSubmit: (formData: FilterForm) => void;
  handlePrevPageClick: () => void;
  handleNextPageClick: () => void;
  handleAddFavourite: (id: number) => void;
  handleDeleteFavourite: (id: number) => void;
  setIsFavFilter: (isFavFilter: boolean) => void;
  resetPage: () => void;
  favFilmsIds: Array<number>;
};

export const FilmFilterContext = createContext({} as FilmFilterContextValue);

const defaultGenres: Genres = {
  actionMovie: false,
  thriller: false,
  detective: false,
  documentary: false,
  biography: false,
};

const defaultRating: Rating = {
  minRating: 1,
  maxRating: 10,
};

const defaultYears: Years = {
  firstYear: 1990,
  lastYear: currYear,
};

export const FilmFilterContextProvider: FC<FilmFilterContextProviderProps> = ({
  children,
}) => {
  const [page, setPage] = useState<number>(1);
  const [genres, setGenres] = useState<Genres>(defaultGenres);
  const [rating, setRating] = useState<Rating>(defaultRating);
  const [years, setYears] = useState<Years>(defaultYears);
  const [favFilmsIds, setFavFilmsIds] = useLocalStorage<Array<number>>(
    "favFilmsIds",
    [],
  );
  const [isFavFilter, setIsFavFilter] = useState<boolean>(false);

  const {
    data: filmList,
    isFetching: isFilmListFetching,
    isError: isFilmListError,
  } = useQuery(
    {
      queryFn: () =>
        fetchFilmList({
          page,
          limit: 50,
          sortField: "rating.kp",
          sortType: "-1",
          genres: getGenresRuList(genres),
          rating: { min: rating.minRating, max: rating.maxRating },
          years: { first: years.firstYear, last: years.lastYear },
          ids: favFilmsIds,
          isFavFilter,
        }),
      queryKey: ["filmList"],
      enabled: !isFavFilter || (isFavFilter && Boolean(favFilmsIds.length)),
    },
    queryClient,
  );

  function handleFilterSubmit(formData: FilterForm) {
    const newGenres: Genres = { ...genres };
    for (const key in formData) {
      if (key in genresDict) {
        newGenres[key as keyof typeof genres] = Boolean(
          formData[key as keyof typeof formData],
        );
      }
    }

    setGenres(newGenres);
    setRating({
      minRating: +formData.minRating,
      maxRating: +formData.maxRating,
    });
    setYears({ firstYear: +formData.firstYear, lastYear: +formData.lastYear });
  }

  function handlePrevPageClick() {
    setPage(page - 1);
  }

  function handleNextPageClick() {
    setPage(page + 1);
  }

  function handleAddFavourite(id: number) {
    const newFavFilmsIds = new Set(Object.values(favFilmsIds));
    newFavFilmsIds.add(id);
    setFavFilmsIds(Array.from(newFavFilmsIds));
  }

  function handleDeleteFavourite(id: number) {
    const newFavFilmsIds = new Set(favFilmsIds);
    newFavFilmsIds.delete(id);
    setFavFilmsIds(Array.from(newFavFilmsIds));
  }

  function resetPage() {
    setPage(1);
  }

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["filmList"] });
  }, [page, genres, rating, years, isFavFilter]);

  const filterData: FilmFilter = {
    page,
    genres,
    rating,
    years,
  };

  const filmFilterContextValue: FilmFilterContextValue = {
    filmList: filmList,
    filterData: filterData,
    isFavFilter,
    isFilmListFetching,
    isFilmListError,
    handleFilterSubmit,
    handlePrevPageClick,
    handleNextPageClick,
    handleAddFavourite,
    handleDeleteFavourite,
    setIsFavFilter,
    resetPage,
    favFilmsIds,
  };

  return (
    <FilmFilterContext.Provider value={filmFilterContextValue}>
      {children}
    </FilmFilterContext.Provider>
  );
};
