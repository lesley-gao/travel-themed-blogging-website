<!-- This component is used in about me page with the timeline function -->
<script>
  import { PUBLIC_IMAGES_URL } from "$env/static/public";
  import "boxicons/css/boxicons.min.css";
  export let article;
</script>

<a href="/articles/{article.id}">
  <div class="whole">
    <!-- article image by user or default one -->
    <div class="image-container">
      <img
        src={article.icon_path.length > 0
          ? `${PUBLIC_IMAGES_URL}/${article.icon_path}`
          : "/dog on kayak.jpg"}
        alt="ArticleImg"
        style="opacity: 0.8"
      />
    </div>

    <div class="article-container">
      <h3>{article.title}</h3>
      <p class="abstract" style="color: #164863;">{article.abstract}</p>
      <h4 class="category" style="color: #fc6736;">
        <i class="bx bxs-plane-alt" />
        {article.category}
      </h4>
    </div>
  </div>
</a>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap");

  * {
    font-family: "Poppins", sans-serif;
  }

  a {
    text-decoration: none;
  }

  p {
    color: #0a1522;
  }

  .whole {
    border-radius: 10px;
    padding: 15px 15px 0px 15px;
    display: flex;
    gap: 20px;
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
    transition: all 0.3s;
    overflow: hidden;
    word-wrap: break-word;
    word-break:break-word;
  }

  .whole:hover:before {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 60px 200px; /* size of the page curl */
    border-color: transparent transparent #164863 transparent;
    transition: all 0.3s;
  }

  .image-container {
    position: relative;
    width: 300px;
    height: 120px;
    border-radius: 10px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  .article-container {
    text-align: left;
  }

  h3 {
    color: #164863;
    margin: 0;
    padding: 0;
    text-transform: uppercase;
  }

  .whole:hover {
    transform: scale(1.05);
  }
</style>
