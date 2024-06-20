import { FilmListPage } from "@pages/FilmListPage";
import { FilmPage } from "@pages/FilmPage";
import { Header } from "@pages/Header";
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
            <Route path="/" element={<FilmListPage />} />
            <Route path="/:id" element={<FilmPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </FilmFilterContextProvider>
  );
}

export default App;
