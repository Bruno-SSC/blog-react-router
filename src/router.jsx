import Layout from "./components/Layout";
import ErrorPage from "./components/Error-page";
import PostsList from "./components/PostsList";
import Post from "./components/Post";
import EditPost, { editAction } from "./components/edit";

import { PostLoader, favoriteAction, destroyAction } from "./components/Post";

import { postListLoader } from "./components/PostsList";

import { newPostAction } from "./components/SearchBar";

export const rootRoute = {
  path: "/",
  element: <Layout />,
  errorElement: <ErrorPage />,
  action: newPostAction,
  loader: postListLoader,
  children: [
    {
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <PostsList />, loader: postListLoader },
        {
          path: "/post/:postID",
          element: <Post />,
          loader: PostLoader,
        },
        {
          path: "/post/:postID/favoriting",
          action: favoriteAction,
        },
        {
          path: "/post/:postID/destroy",
          action: destroyAction,
        },
        {
          path: "/post/:postID/edit",
          element: <EditPost />,
          loader: PostLoader,
          action: editAction,
        },
      ],
    },
  ],
};
