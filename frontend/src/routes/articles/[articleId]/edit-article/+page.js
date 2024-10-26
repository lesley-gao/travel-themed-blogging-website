
import { ARTICLE_URL } from "$lib/js/api-urls.js";
import { COMMENT_URL } from "$lib/js/api-urls.js";
import { LIKES_URL } from "$lib/js/api-urls.js";

export async function load({ parent, fetch, params }) {
  const articleId = params.articleId;

  const articleResponse = await fetch(`${ARTICLE_URL}/${articleId}`);
  const article = await articleResponse.json();

  const commentsResponse = await fetch(`${COMMENT_URL}/${articleId}`);
  const comments = await commentsResponse.json();

  const likesResponse = await fetch(`${LIKES_URL}/${articleId}`, { credentials: "include" });
  const likes = await likesResponse.json();

  const { isLoggedIn } = await parent();
  let isUserLiked;
  if (isLoggedIn) {
    const isLikedResponse = await fetch(`${LIKES_URL}/${articleId}/like`, { credentials: "include" });
    isUserLiked = await isLikedResponse.json();
  } else {
    isUserLiked = false;
  }

  return { article, comments, likes, isUserLiked };
}

