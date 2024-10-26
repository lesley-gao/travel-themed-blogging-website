<!-- designed for Customized 404 page -->

<svelte:head>
  <title>404</title>
</svelte:head>

<div>
  <h1 style="text-align: center;">404</h1>
  <p>Oops! Page Not Found.</p>
  <img src="/where.gif" alt="Oops" />
  <p>Looks like this page went on vacation.</p>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap");

  * {
    font-family: "Poppins", sans-serif;
    color: #3d3b40;
  }

  div {
    padding: 150px;
  }

  img {
    display: flex;
    margin: 30px auto;
    width: 300px;
  }

  p {
    text-align: center;
    font-size: 1.5em;
    margin: 10px;
  }
</style>
