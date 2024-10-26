<!-- Create article page -->
<script>
  import dayjs from "dayjs";
  import ArticleEditor from "../../../../lib/components/ArticleEditor.svelte";
  export let data;
  const article = data.article;
  const content = article.content;
  const title = article.title;
  const abstract = article.abstract;
  const category = article.category;
  const edit_time = dayjs().format("YYYY-MM-DD");
  const id = article.id;
  const icon_path = article.icon_path;
  const isEdit = true;
</script>

<svelte:head>
  <title>Edit Article</title>
</svelte:head>

<div class="container">
  <h2>Edit Your Article</h2>
  <div class="editor">
    <ArticleEditor {content} {title} {abstract} {category} {edit_time} {id} {icon_path} {isEdit} />
  </div>
  <div class="image">
    <img src="/write.png" alt="blogging" />
  </div>
</div>

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

  .image {
    z-index: -1;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 450px;
    height: 450px;
    opacity: 0.8;
  }

  img {
    width: 100%;
  }
</style>
