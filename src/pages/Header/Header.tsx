import { default as React, FC } from "react";
import styles from "./header.css";
import { Link } from "react-router-dom";

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <Link to="/">Главная</Link>
      </div>
    </header>
  );
};
