<!-- This component is used as the image header in the single article page -->
<script>
  import { PUBLIC_IMAGES_URL } from "$env/static/public";
  export let article;
</script>

<div class="container">
  <div class="fullwidth-image">
    <img
      src={article.icon_path.length > 0
        ? `${PUBLIC_IMAGES_URL}/${article.icon_path}`
        : "/dog on kayak.jpg"}
      alt="ArticleImg"
    />
  </div>

  <div class="content-wrapper">
    <h2>{article.title}</h2>
    <p class="intro-text">
      {article.abstract}
    </p>
  </div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap");

  * {
    margin: 0;
    padding: 0;
    font-family: "Poppins", sans-serif;
  }

  .container {
    position: relative;
    height: 100%;
  }

  .fullwidth-image {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 70vh;
    z-index: -2;

    & img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      opacity: 0.8;
    }
  }

  .fullwidth-image::before {
    z-index: 999;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70vh;
    background: rgb(255, 255, 255, 0.3);
  }

  .content-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    max-width: 700px;
    color: rgb(39, 39, 39);
    padding: 2%;
    background-color: rgba(255, 255, 255, 0.5);
    overflow: hidden;
    word-wrap: break-word;
    word-break:break-word;

    &h1 {
      font-size: 4em;
      font-weight: bold;
      text-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    }
  }
</style>
