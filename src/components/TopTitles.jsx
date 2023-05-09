import React from "react";
import style from "../assets/styles/header/TopTitles.module.css";

const TopTitles = () => {
  return (
    <div className={style.topTitles}>
      <h1 className={style.title}>Codelândia</h1>
      <h1 className={style.title}>blog</h1>
    </div>
  );
};

export default TopTitles;
