import { default as React, FC } from "react";
import styles from "./header.css";
import { Link } from "react-router-dom";

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Link to="/">Главная</Link>
      <Link to={"/favourites"}>Избранное</Link>
    </header>
  );
};
