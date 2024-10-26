<!--This component will be used in single article pages( e.g: http://localhost:5173/articles/1/)-->

<script>
  import { PUBLIC_IMAGES_URL } from "$env/static/public";
  export let article;
</script>

<a href="/articles/{article.id}">
  <div class="whole">
    <div class="image">
      <img
        class="article-image"
        src={`${PUBLIC_IMAGES_URL}/${article.icon_path}`}
        alt="ArticleImg"
      />
    </div>
    <h4 class="title">{article.title}</h4>
  </div>
</a>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap");

  a {
    text-decoration: none;
  }

  .whole {
    border-radius: 10px;
    padding: 15px;
    width: 300px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    gap: 20px;
    font-family: "Poppins", sans-serif;
    color: #164863;
    transition: all 0.3s;
    overflow: hidden;
    word-wrap: break-word;
    word-break:break-word;
  }

  .whole:hover {
    transform: scale(1.05);
    background-color: rgb(255, 255, 255, 0.5);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }

  img {
    height: 100%;
    object-fit: cover;
    width: 90px;
  }
</style>
