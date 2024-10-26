import { ARTICLE_URL } from "$lib/js/api-urls.js";

//fetch articles data to display in about me page
export async function load({ parent, fetch }) {

    const { user } = await parent();
    const articleResponse = await fetch(`${ARTICLE_URL}/user/${user.id}`);
    const articles = await articleResponse.json();
    return { articles };
}


