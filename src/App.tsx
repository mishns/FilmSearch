import { FilmListPage } from "@pages/FilmListPage";
import { FilmPage } from "@pages/FilmPage";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FilmListPage />} />
          <Route path="/:id" element={<FilmPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
