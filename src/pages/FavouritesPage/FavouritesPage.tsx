import { default as React, FC, useContext, useEffect } from "react";
import { FilmListPage } from "@pages/FilmListPage";
import { FilmFilterContext } from "@src/contexts/FilmFilterContext";

export const FavouritesPage: FC = () => {
  const { setIsFavFilter, resetPage } = useContext(FilmFilterContext);
  useEffect(() => {
    setIsFavFilter(true);
    return () => {
      setIsFavFilter(false);
      resetPage();
    };
  }, []);
  return <FilmListPage />;
};
