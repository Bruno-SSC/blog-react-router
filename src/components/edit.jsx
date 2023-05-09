import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import style from "../assets/styles/main/Edit.module.css";

import { updatePost } from "../contacts";

export const editAction = async ({ request, params }) => {
  const formData = await request.formData(); //? cria um obj com as chaves/valores do form recebido.
  const updates = Object.fromEntries(formData); //? cria um objeto a partir de um iterável com pares chave/valor
  await updatePost(params.postID, updates);
  return redirect(`/post/${params.postID}`);
};
export default function EditPost() {
  const { data } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form className={style.editForm} method="post">
      <div className={style.title}>
        <label htmlFor="formTitle">
          <span>Title</span>
        </label>
        <input
          placeholder="Your post title."
          aria-label="post title"
          type="text"
          name="title"
          id="formTitle"
          defaultValue={data.title}
        />
      </div>
      <div>
        <label htmlFor="formResume">
          <span>Resume</span>
        </label>
        <input
          id="formResume"
          type="text"
          name="resume"
          placeholder="write some words for you blog's resume"
          defaultValue={data.resume}
        />
      </div>
      <div>
        <label htmlFor="formTextArea">
          <span>Article text </span>
        </label>
        <textarea
          id="formTextArea"
          cols="30"
          rows="30"
          aria-label="article text"
          name="article"
          defaultValue={data.article}
        />
      </div>
      <div className={style.actionsMenu}>
        <button className={style.shadow__btn} type="submit">
          Save
        </button>
        <button
          className={style.shadow__btn}
          type="button"
          onClick={() => {
            navigate(-1);
          }}>
          Cancel
        </button>
      </div>
    </Form>
  );
}
