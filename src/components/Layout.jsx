import React from "react";
import { Outlet, useNavigation } from "react-router-dom";

import style from "../assets/styles/App.module.css";

import TopTitles from "./TopTitles";
import SearchBar from "./SearchBar";

function Layout() {
  const navigation = useNavigation();

  return (
    <section className={style.app}>
      <header className={style.header}>
        <TopTitles />
        <SearchBar />
      </header>
      <main
        className={[
          style.main,
          navigation.state === "loading" ? style.loading : "",
        ].join(" ")}>
        <Outlet />
      </main>
    </section>
  );
}

export default Layout;
