import { ARTICLE_URL } from "$lib/js/api-urls.js";
import { COMMENT_URL } from "$lib/js/api-urls.js";

export async function load({ fetch, params }) {
    const articleId = params.articleId;
    //fetch single article data according to article id
    const articleResponse = await fetch(`${ARTICLE_URL}/${articleId}`);
    const article = await articleResponse.json();

    //fetch comments data for this single article
    const commentsResponse = await fetch(`${COMMENT_URL}/${articleId}`);
    const comments = await commentsResponse.json();

    // fetch all article data for "more articles" section
    const response = await fetch(ARTICLE_URL, { credentials: "include" });
    const articles = await response.json();

    return { article, comments, articles };
}

