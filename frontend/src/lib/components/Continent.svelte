<!--This component will be used in destinations' subpages, showing the title & abstract of articles-->

<script>
  export let article;
  import { PUBLIC_IMAGES_URL } from "$env/static/public";
</script>

<div class="whole">
  <div class="box">
    <div class="img-box">
      <img src={`${PUBLIC_IMAGES_URL}/${article.icon_path}`} alt="ArticleImg" />
    </div>
    <div class="content">
      <div class="article-title">
        <h3>{article.title}</h3>
      </div>
      <div>
        <p>{article.abstract}</p>
      </div>
    </div>
  </div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap");

  * {
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    font-family: "Poppins", sans-serif;
    color: #164863;
  }

  .whole {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 10px;
  }

  .box {
    position: relative;
    width: 300px;
    height: 500px;
    background: rgba(221,242,253, 0.5);
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.5);
  }

  .img-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.5s;
  }

  .box:hover .img-box img {
    opacity: 0;
  }

  /*style of the title div when not hovered on*/
  .article-title {
    position: absolute;
    bottom: 20px;
    left: 10%;
    width: 80%;
    display: block;
    height: 70px;
    background: white; 
    transition: 0.5s;
    overflow: hidden;
    padding: 10px;
    box-sizing: border-box;
  }

  .content{
    overflow: hidden;
    word-wrap: break-word;
    word-break:break-word;
  }

   /*style of the div when hovered on*/
  .box:hover .article-title {
    width: 100%;
    height: 100%;
    bottom: 0;
    left: 0;
    background: rgba(221,242,253, 0.5);
  }

  .box:hover h3 {
    margin-top: 20px;
    padding: 10px;
  }

  .box:hover .content p{
    z-index: 888;
    opacity: 1;
    padding: 20px;
  }

</style>
