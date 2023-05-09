import React from "react";
import { Link, useFetcher } from "react-router-dom";

import style from "../assets/styles/main/Post.module.css";

import heartIcon from "../assets/images/heart.png";
import filledHeartIcon from "../assets/images/filled_heart.png";

const CardPost = ({ data }) => {
  const fetcher = useFetcher();

  //! aqui tem um erro, como o fetcher não tem acesso ao loader do comp PostList.jsx que é o responsável de carregar os dados de todos posts, pode ser que isso impeça ele de performar rapidamente como é o caso no Post em si que carrega apenas o post e não a lista toda

  if (fetcher.formData) data.favorite = fetcher.formData.get("favoriteBTN") === true;

  return (
    <div className={style.post}>
      <div className={style.meta}>
        <span className={style.date}>{data.date}</span>

        <fetcher.Form
          method="post"
          action={`post/${data.id}/favoriting`}
          className={style.heartImgWrapper}>
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
      </div>

      <div className={style.actionsMenu}>
        <Link to={`post/${data.id}`}>
          <button type="button" className={style.shadow__btn}>
            Read more...
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CardPost;
