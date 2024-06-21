import { default as React, useContext, useEffect } from "react";
import { FilmListPage } from "@pages/FilmListPage";
import { FilmFilterContext } from "@src/contexts/FilmFilterContext";

export const MainPage = () => {
  const { resetPage } = useContext(FilmFilterContext);
  useEffect(() => {
    return resetPage;
  }, []);
  return <FilmListPage />;
};
