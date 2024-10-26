<!-- Homepage -->

<script>
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<div class="home">
  <video class="video-slide" src="/video/motorbike.mp4" autoplay muted loop />
  <div class="content">
    <h1>WORLD.<br /><span>Unwritten</span></h1>
    <p>
      Your Travel Stories Begin Here! Embark on a journey where every step unfolds a new adventure.
      Whether navigating bustling streets or savoring tranquility, each destination becomes a
      chapter in your unique tale. Discover cultures, embrace the extraordinary, and let the world
      be the canvas for your unforgettable memories. Pack your bags and let the adventure begin!
    </p>
    <button class="button"><a href="/articles">Start Exploring</a></button>
  </div>

</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap");

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
  }

  .home {
    padding: 100px 200px;
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background: #DDF2FD;
  }

  /* create a overlay for better visibility of content */
  .home::before {
    z-index: 777;
    content: "";
    position: absolute;
    background: rgba(121, 180, 183, 0.3);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .home .content {
    z-index: 888;
    color: #fff;
    width: 70%;
    margin-top: 50px;
  }

  .home .content h1 {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 4em;
    font-weight: 900;
    letter-spacing: 3px;
    line-height: 75px;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  .home .content h1 span {
    font-size: 1.2em;
    font-weight: 600;
    font-family: 'Dancing Script', cursive;
  }

  .home .content p {
    margin-bottom: 65px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1); 
  }

  /* style for the exploring button */
  button {
    background-color: rgb(255, 255, 255, 0.6);
    height: 50px;
    width: 250px;
    text-align: center;
    cursor: pointer;
    border: none;
    border-radius: 50px;
    transition: all 0.3s; 
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }

  button a {
    padding: 15px 35px;
    font-size: 1.3em;
    color: white;
    font-weight: 500;
    text-decoration: none;
    text-shadow: 3px 3px 20px rgba(0, 0, 0, 0.9);
  }

  button:hover{
    transform: scale(1.05);
    background-color: #164863;
    color: white;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  button:active {
    background-color: #2476a2;
    color: white;
    color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  /* style for video */
  video {
    z-index: 000;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 1040px) {
    .home {
      padding: 100px 20px;
    }
  }
</style>
