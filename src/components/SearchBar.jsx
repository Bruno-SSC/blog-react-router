import React from "react";

import { redirect, useFetcher, Form, useSubmit, useLoaderData } from "react-router-dom";

import loupeIcon from "../assets/images/loupe.svg";
import style from "../assets/styles/header/SearchBar.module.css";

import { createPost } from "../contacts";

export const newPostAction = async () => {
  const post = await createPost();
  if (!post) throw new Error("Something wen't wrong");
  return redirect("/");
};

const SearchBar = () => {
  const fetcher = useFetcher();
  const submit = useSubmit();
  const { query } = useLoaderData();

  return (
    <div className={style.searchBar}>
      <Form className={style.searchForm}>
        <div className={style.loupeImgWrapper}>
          <img className={style.loupeIcon} src={loupeIcon} alt="loupe icon" />
        </div>
        <input
          name="postSearch"
          className={style.input}
          type="text"
          placeholder="could I help you?"
          defaultValue={query}
          onChange={(e) => {
            const firstSearch = query == null;
            submit(e.currentTarget.form, {
              replace: !firstSearch,
            });
            e.preventDefault();
          }}
        />
      </Form>

      <fetcher.Form method="post">
        <button type="submit" className={style.shadow__btn}>
          <p>New</p>
        </button>
      </fetcher.Form>
    </div>
  );
};

export default SearchBar;
