import { FavouritesPage } from "@pages/FavouritesPage";
import { FilmPage } from "@pages/FilmPage";
import { Header } from "@pages/Header";
import { MainPage } from "@pages/MainPage";
import { FilmFilterContextProvider } from "@src/contexts/FilmFilterContext";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <FilmFilterContextProvider>
      <BrowserRouter>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/:id" element={<FilmPage />} />
            <Route path="/favourites" element={<FavouritesPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </FilmFilterContextProvider>
  );
}

export default App;
