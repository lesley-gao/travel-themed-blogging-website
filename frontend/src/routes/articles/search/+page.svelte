<!-- the page to display all matching search results -->
<script>
  import AbstractCardOne from "$lib/components/AbstractCardOne.svelte";
  import SortButton from "$lib/components/SortButton.svelte";
  export let data;
  let searchResults = data.searchResults;
  // tried every method, this is the only way worked
  //otherwise search page will not rerender when the query string in url changed
  $: searchResults = data.searchResults;

  function handleSorting(event) {
    searchResults = event.detail;
  }
</script>

<svelte:head>
  <title>Search Results</title>
</svelte:head>

<div class="whole">
  <div class="container">
    <!-- if there's a search result, display message and the sort button -->
    {#if searchResults && searchResults.length > 0}
      <h2 style="margin-left: 30px;">Ta-da! Your search results have arrived...</h2>
      <SortButton {searchResults} on:sortArticle={handleSorting} />
    {/if}
  </div>

  <div class="article-wrapper">
    <!-- if there are matching articles, display them below   -->
    {#if searchResults && searchResults.length > 0}
      <div class="article-div">
        {#each searchResults as article}
          <div class="article">
            <AbstractCardOne {article} />
          </div>
        {/each}
      </div>
      <!-- if there are no matching articles, send a warning message   -->
    {:else}
      <div class="warning">
        <img src="/lovely.gif" alt="oops" />
        <p>No matching articles found. Please try a different search.</p>
      </div>
    {/if}
  </div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap");

  .whole {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 180px;
    padding: 180px 120px;
    font-family: "Poppins", sans-serif;
  }

  .article-div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .article-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

  .article {
    margin: 20px;
    transition: all 0.3s;
  }

  .article:hover {
    transform: scale(1.1);
  }

  .warning {
    color: #164863;
    font-family: "Poppins", sans-serif;
    font-size: 1.3em;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
  }

  /* add media query */
  @media (max-width: 800px) {
    .article-div {
      grid-template-columns: auto; /* only one column displayed */
    }

    .container {
      padding-top: 180px;
      gap: 10px;
    }
  }

  @media (min-width: 800px) and (max-width: 1200px) {
    .article-div {
      grid-template-columns: 1fr 1fr; /* two column displayed */
    }
  }
</style>
