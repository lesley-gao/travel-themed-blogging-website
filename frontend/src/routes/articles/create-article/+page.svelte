<!-- Single article page show the full content of the article -->
<script>
  import ArticleEditor from "../../../lib/components/ArticleEditor.svelte";
  const isCreate = true;
  export let data;
</script>

<svelte:head>
  <title>Create Article</title>
</svelte:head>

{#if data.user}
  <div class="container">
    <h2>Create Your Article</h2>
    <div class="editor">
      <ArticleEditor {isCreate} />
    </div>
    <div class="image">
      <img src="/write.png" alt="blogging"/>
    </div>
  </div>
{/if}

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .container {
    position: relative;
    padding: 180px 180px 0px 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .image{
    z-index: -1;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 450px;
    height: 450px;
    opacity: 0.8;
  }

  img{
    width: 100%;
  }
</style>
