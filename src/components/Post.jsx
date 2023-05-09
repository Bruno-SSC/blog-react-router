import React from "react";
import { useLoaderData, Link, useFetcher, Form, redirect } from "react-router-dom";

import { getPost, updatePost, deleteContact } from "../contacts";

import style from "../assets/styles/main/PostFull.module.css";

import heartIcon from "../assets/images/heart.png";
import filledHeartIcon from "../assets/images/filled_heart.png";

export const destroyAction = async ({ params }) => {
  await deleteContact(params.postID);
  return redirect("/");
};

export const favoriteAction = async ({ request, params }) => {
  const formData = await request.formData();
  return updatePost(params.postID, {
    favorite: formData.get("favoriteBTN") === "true",
  });
};

export const PostLoader = async ({ params }) => {
  const data = await getPost(params.postID);
  if (!data) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { data };
};

function Post() {
  const { data } = useLoaderData();
  const fetcher = useFetcher();

  if (fetcher.formData) {
    data.favorite = fetcher.formData.get("favoriteBTN") === "true";
  }

  return (
    <div className={style.post}>
      <div className={style.meta}>
        <span className={style.date}>{data.date}</span>

        <fetcher.Form method="post" action="favoriting" className={style.heartImgWrapper}>
          <button name="favoriteBTN" value={!data.favorite}>
            <img
              className={style.heartIcon}
              src={data.favorite ? filledHeartIcon : heartIcon}
              alt="heart icon"
            />
          </button>
        </fetcher.Form>
      </div>

      <div className={style.content}>
        <h1 className={style.title}>{data.title}</h1>
        <small className={style.resume}>{data.resume}</small>
        <article className={[style.text, style.show].join(" ")}>{data.article}</article>
      </div>
      <div className={style.actionsMenu}>
        <Link className={style.linkItem} to={`edit`}>
          <button className={style.shadow__btn}>edit</button>
        </Link>
        <Link className={style.linkItem} to={`/`}>
          <button className={style.shadow__btn}>back</button>
        </Link>
        <Form method="post" className={style.linkItem} action="destroy">
          <button className={style.shadow__btn}>Delete</button>
        </Form>
      </div>
    </div>
  );
}

export default Post;
