<!-- subpages of destinations - showing all articles under the category of Oceania -->
<script>
  export let data;
  import Continent from "$lib/components/Continent.svelte";
</script>

<svelte:head>
  <title>Oceania</title>
</svelte:head>

<div class="arrow">
  Scroll to the right to view more articles<i class="bx bx-right-arrow-alt" />
</div>
<div class="scrollable-container">
<div class="article-wrapper">
  {#each data.articles as article (article.id)}
    {#if article.category === "Oceania"}
      <a class="card" href="/articles/{article.id}">
        <div class="article">
          <Continent {article} />
        </div>
      </a>
    {/if}
  {/each}
</div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap");

  .scrollable-container {
    position: absolute;
    left: 0;
    top:180px;
    max-height: 700px;  
    width: 100%;
    overflow-y:auto;
  }

  /* style of the scrollbar */
  ::-webkit-scrollbar {
    width: 12px; 
  }

  ::-webkit-scrollbar-thumb {
    background-color: #B6BBC4; 
    border-radius: 10px; 
  }

 ::-webkit-scrollbar-track {
    background-color: white;
  }

  ::-webkit-scrollbar-thumb:hover {
  background:#2476a2;
}

  .arrow {
    position: fixed;
    margin-top: 160px;
    top: 0;
    left: 60px;
    font-size: 1.2em;
    color: #3d3b40;
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
  }

  .article-wrapper {
    display: inline-flex;
    padding: 5px;  
    transition: all 0.3s;
  }

  .article {
    margin: 10px 10px 0px 10px;
  }

  a {
    text-decoration: none;
  }
  
  /* add media query */
  @media (max-width: 680px) {
    .article-wrapper {
      display: grid;
      grid-template-columns: auto; /* only one column displayed */
    }

    .arrow {
     color: white;
    }
  }

  @media (min-width: 680px) and (max-width: 800px) {
    .article-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr; /* two columns displayed */
    }

    .arrow {
     color: white;
    }
  }

  @media (min-width: 800px) and (max-width: 1200px) {
    .article-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr; /* three columns displayed */
    }

    .arrow {
     color: white;
    }
  }
</style>
