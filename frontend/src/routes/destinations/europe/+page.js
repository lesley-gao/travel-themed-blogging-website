import { ARTICLE_URL } from "$lib/js/api-urls.js";

export async function load({ fetch }) {
    const response = await fetch(ARTICLE_URL, { credentials: "include" });
    const articles = await response.json();
    return { articles };
}