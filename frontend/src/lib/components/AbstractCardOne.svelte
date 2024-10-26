<!--This component will be used in the page that lists all the articles(http://localhost:5173/articles)-->
<script>
  import { PUBLIC_IMAGES_URL } from "$env/static/public";
  import "boxicons/css/boxicons.min.css";
  import StackedLikes from "./StackedLikes.svelte";

  export let article;
  let isOnSingleArticlePage = false;
</script>

<div class="whole">
  <a class="card" href="/articles/{article.id}">
    <div class="article-img">
      <img
        src={article.icon_path.length > 0
          ? `${PUBLIC_IMAGES_URL}/${article.icon_path}`
          : "/dog on kayak.jpg"}
        alt="ArticleImg"
      />
    </div>

    <div class="article-info">
      <h1>{article.title}</h1>
      <p class="abstract">{article.abstract}</p>
      <p class="category"><i class="bx bxs-plane-alt" /> {article.category}</p>

      <StackedLikes articleId={article.id} {isOnSingleArticlePage} />
    </div>
  </a>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap");

  .whole {
    border-radius: 10px;
    padding: 30px;
    width: 300px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }

  .card {
    font-family: "Poppins", sans-serif;
    text-decoration: none;
    transition: all 0.3s;
    overflow: hidden;
    word-wrap: break-word;
    word-break:break-word;
  }

  h1,
  .abstract {
    color: #164863;
  }

  .category {
    color: #fc6736;
  }

  a {
    text-decoration: none;
  }

  .article-img {
    border-radius: 10px;
    background-color: black; /* set a color in case a png file is inserted here */
    opacity: 0.8;
    overflow: hidden;
    position: relative;
  }

  .article-img::before {
    content: ""; /*generates an empty content box for the pseudo-element.*/
    position: absolute;
    top: -10px; /* Shifts the pseudo-element 10px above the container, creating a visual overlap*/
    left: 0;
    width: 100%;
    height: 20px; /* the height of the concave part*/
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent); /*Adjust the gradient*/
  }

  img {
    height: 200px;
    width: 100%;
    object-fit: cover;
    display: block;
  }

  .article-info {
    margin-top: 20px;
  }

  h1 {
    color: #164863;
    font-size: 1.2rem;
  }
</style>
