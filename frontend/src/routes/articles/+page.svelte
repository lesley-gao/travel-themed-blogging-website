<!-- The page show all the articles in the database -->
<script>
  export let data;
  import AbstractCardOne from "$lib/components/AbstractCardOne.svelte";
  import AbstractCardTwo from "$lib/components/AbstractCardTwo.svelte";
</script>

<svelte:head>
  <title>All Articles</title>
</svelte:head>

<div class="whole">
  <div class="article-wrapper">
    {#each data.articles as article (article.id)}
      {#if article.id % 2 === 0}
        <div class="article">
          <AbstractCardTwo {article} />
        </div>
      {:else}
        <div class="article">
          <AbstractCardOne {article} />
        </div>
      {/if}
    {/each}
  </div>
</div>

<style>
  .whole {
    padding: 180px 130px 50px 130px;
  }

  .article-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .article {
    border-radius: 10px;
    height: fit-content;
    transition: all 0.3s;
    margin: 10px;
    display: flex;
    justify-content: center;
  }

  .article:hover {
    transform: scale(1.1);
  }

  /* add media query */
  @media (max-width: 800px) {
    .article-wrapper {
      grid-template-columns: auto; /* only one column displayed */
    }
  }

  @media (min-width: 800px) and (max-width: 1200px) {
    .article-wrapper {
      grid-template-columns: 1fr 1fr; /* two column displayed */
    }
  }
</style>
