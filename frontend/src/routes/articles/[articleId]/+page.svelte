<!-- single article page -->

<script>
  export let data;
  import WholeArticle from "$lib/components/WholeArticle.svelte";
  import MoreReadings from "$lib/components/MoreReadings.svelte";
  import SingleArticleImage from "$lib/components/SingleArticleImage.svelte";

  let user = data.user;
</script>

<svelte:head>
  <title>Article</title>
</svelte:head>
<!-- image header of the article -->
<SingleArticleImage article={data.article} />

<!-- main article card -->
<div class="whole">
  <div class="main-section">
    {#if data.article}
      <div class="article">
        <WholeArticle article={data.article} {user} comments={data.comments} />
      </div>
    {/if}
  </div>

  <!-- display titles & images of 6 other articles after the current article. If there are less than 6 articles
    that follow the current one, display the first 6 articles of the database in this section.-->
  <div class="article-list">
    <h3><i class="bx bx-book" /> MORE ARTICLES</h3>
    {#if data.article.id <= data.articles.length - 6}
      {#each data.articles.slice(data.article.id, data.article.id + 6) as article (article.id)}
        <div class="article">
          <MoreReadings {article} />
        </div>
      {/each}
    {:else}
      {#each data.articles.slice(0, 6) as article (article.id)}
        <div class="article">
          <MoreReadings {article} />
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  .whole {
    display: grid;
    grid-template-columns: auto auto;
    gap: 60px;
    padding: 50px 120px;
  }

  h3 {
    color: #164863;
  }

  .main-section {
    grid-column: 1;
  }

  .article-list {
    grid-column: 2;
    width: 20vw;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  @media (max-width: 1000px) {
    .whole {
      grid-template-columns: auto; /* only one column displayed */
    }
  }
</style>
