import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

let postsSample = [
  {
    title: "Como começar a praticar yoga",
    resumo:
      "Descubra as principais dicas para começar a praticar yoga, desde como escolher um professor até como escolher o tipo certo de yoga para você.",
    date: "2022-01-01",
    article:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut diam dapibus, gravida est ut, ornare tellus. Nulla id bibendum nibh, eu convallis odio. Sed ac mi eget elit iaculis feugiat. Suspendisse vel feugiat elit, sit amet facilisis velit. Fusce bibendum venenatis nunc, quis rhoncus quam tempor in. Nam suscipit odio nec arcu dictum, vel ullamcorper eros ultricies. Fusce ac nulla id augue luctus aliquet. Sed pharetra iaculis velit, vel fermentum lectus dapibus vitae. Vestibulum auctor mauris non sem elementum, nec sollicitudin mauris consequat.",
    favorite: false,
    id: 0,
  },
  {
    title: "Receita de bolo de cenoura saudável",
    resumo:
      "Aprenda a fazer um bolo de cenoura delicioso e saudável, com ingredientes naturais e sem açúcar refinado.",
    date: "2022-01-05",
    article:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut diam dapibus, gravida est ut, ornare tellus. Nulla id bibendum nibh, eu convallis odio. Sed ac mi eget elit iaculis feugiat. Suspendisse vel feugiat elit, sit amet facilisis velit. Fusce bibendum venenatis nunc, quis rhoncus quam tempor in. Nam suscipit odio nec arcu dictum, vel ullamcorper eros ultricies. Fusce ac nulla id augue luctus aliquet. Sed pharetra iaculis velit, vel fermentum lectus dapibus vitae. Vestibulum auctor mauris non sem elementum, nec sollicitudin mauris consequat.",
    favorite: false,
    id: 1,
  },
  {
    title: "10 dicas para cuidar da saúde mental",
    resumo:
      "Confira 10 dicas simples e eficazes para cuidar da sua saúde mental e manter o bem-estar emocional em dia.",
    date: "2022-01-10",
    article:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut diam dapibus, gravida est ut, ornare tellus. Nulla id bibendum nibh, eu convallis odio. Sed ac mi eget elit iaculis feugiat. Suspendisse vel feugiat elit, sit amet facilisis velit. Fusce bibendum venenatis nunc, quis rhoncus quam tempor in. Nam suscipit odio nec arcu dictum, vel ullamcorper eros ultricies. Fusce ac nulla id augue luctus aliquet. Sed pharetra iaculis velit, vel fermentum lectus dapibus vitae. Vestibulum auctor mauris non sem elementum, nec sollicitudin mauris consequat.",
    favorite: false,
    id: 2,
  },
  {
    title: "Dicas para decorar sua casa no estilo boho",
    resumo:
      "Conheça o estilo de decoração boho e descubra como aplicá-lo na sua casa, com dicas de cores, tecidos e objetos decorativos.",
    date: "2022-01-15",
    article:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut diam dapibus, gravida est ut, ornare tellus. Nulla id bibendum nibh, eu convallis odio. Sed ac mi eget elit iaculis feugiat. Suspendisse vel feugiat elit, sit amet facilisis velit. Fusce bibendum venenatis nunc, quis rhoncus quam tempor in. Nam suscipit odio nec arcu dictum, vel ullamcorper eros ultricies. Fusce ac nulla id augue luctus aliquet. Sed pharetra iaculis velit, vel fermentum lectus dapibus vitae. Vestibulum auctor mauris non sem elementum, nec sollicitudin mauris consequat.",
    favorite: false,
    id: 3,
  },
  {
    title: "Como organizar sua rotina de estudos",
    resumo:
      "Saiba como organizar sua rotina de estudos de forma eficiente e produtiva, com técnicas de planejamento e gestão do tempo.",
    date: "2022-01-20",
    article:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut diam dapibus, gravida est ut, ornare tellus. Nulla id bibendum nibh, eu convallis odio. Sed ac mi eget elit iaculis feugiat. Suspendisse vel feugiat elit, sit amet facilisis velit. Fusce bibendum venenatis nunc, quis rhoncus quam tempor in. Nam suscipit odio nec arcu dictum, vel ullamcorper eros ultricies. Fusce ac nulla id augue luctus aliquet. Sed pharetra iaculis velit, vel fermentum lectus dapibus vitae. Vestibulum auctor mauris non sem elementum, nec sollicitudin mauris consequat.",
    favorite: true,
    id: 4,
  },
];

/* set([]); */

const buildDate = () => {
  let date = new Date();
  const day = date.getDay().toString().padStart(2, "0");
  const month = (date.getMonth()+1).toString().padStart(2, "0");
  const year = date.getFullYear();

  date = year + '-' + month + "-" + day;
  return date;
};

export async function getPosts(query) {
  await fakeNetwork(`getPosts:${query}`);
  let posts = await localforage.getItem("posts");
  if (!posts) posts = [];
  if (query) {
    posts = matchSorter(posts, query, { keys: ["title"] });
  }
  return posts.sort(sortBy("last", "date"));
}

export async function createPost() {
  await fakeNetwork();

  let date = buildDate();
  let id = Math.random().toString(36).substring(2, 9);
  let post = {
    title: "Your new post.",
    resume:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut diam dapibus, gravida est ut, ornare tellus. Nulla id bibendum nibh, eu convallis odio. Sed ac mi eget elit iaculis feugiat.",
    date,
    article:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut diam dapibus, gravida est ut, ornare tellus. Nulla id bibendum nibh, eu convallis odio. Sed ac mi eget elit iaculis feugiat. Suspendisse vel feugiat elit, sit amet facilisis velit. Fusce bibendum venenatis nunc, quis rhoncus quam tempor in. Nam suscipit odio nec arcu dictum, vel ullamcorper eros ultricies. Fusce ac nulla id augue luctus aliquet. Sed pharetra iaculis velit, vel fermentum lectus dapibus vitae. Vestibulum auctor mauris non sem elementum, nec sollicitudin mauris consequat.",
    favorite: false,
    id,
  };
  let posts = await getPosts();
  posts.unshift(post);
  await set(posts);
  return post;
}

export async function getPost(id) {
  await fakeNetwork(`post:${id}`);
  let posts = await localforage.getItem("posts");
  let post = posts.find((p) => p.id === id);
  return post ?? null;
}

export async function updatePost(id, updates) {
  await fakeNetwork();
  let posts = await localforage.getItem("posts");
  let post = posts.find((p) => p.id === id);
  if (!post) throw new Error("No post found for", id);
  Object.assign(post, updates);
  await set(posts);
  return post;
}

export async function deleteContact(id) {
  let posts = await localforage.getItem("posts");
  let index = posts.findIndex((p) => p.id === id);
  if (index > -1) {
    posts.splice(index, 1);
    await set(posts);
    return true;
  }
  return false;
}

export function set(posts) {
  return localforage.setItem("posts", posts);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
