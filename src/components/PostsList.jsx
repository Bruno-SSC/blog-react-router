import React from "react";
import { useLoaderData } from "react-router-dom";

import style from "../assets/styles/main/PostsList.module.css";
import CardPost from "./CardPost";
import { getPosts } from "../contacts";

export const postListLoader = async ({ request }) => {
  const url = new URL(request.url);
  let query = url.searchParams.get("postSearch");
  const posts = await getPosts(query);
  if (!query) query = null;
  return { posts, query };
};

const PostsList = () => {
  const { posts } = useLoaderData();

  return (
    <section className={style.postsList}>
      {posts.length > 0 && posts.map((p) => <CardPost key={p.id} data={p} />)}
      {!posts.length && (
        <div className={style.emptyList}>
          <h1 className={style.message}>We are out of posts. Please, fill it.</h1>
        </div>
      )}
    </section>
  );
};

export default PostsList;
