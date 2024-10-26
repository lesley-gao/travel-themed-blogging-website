import { SEARCH_URL } from "$lib/js/api-urls.js";

export async function load({ fetch, url }) {
    //get the query string from url
    const keyword = url.searchParams.get("keyword");
    const search = url.searchParams.get("search");
    const dateMin = url.searchParams.get("dateMin");
    const dateMax = url.searchParams.get("dateMax");
    //fetch the result by different ways
    let results;
    if (keyword) {
        results = await fetch(`${SEARCH_URL}/${search}/?keyword=${keyword}`, {
            credentials: "include"
        });
    } else if ((dateMin, dateMax)) {
        results = await fetch(`${SEARCH_URL}/date/?dateMin=${dateMin}&dateMax=${dateMax}`, {
            credentials: "include"
        });
    }
    //if there's a result, return 
    if (results) {
        const searchResults = await results.json();
        return { searchResults };
    }
}