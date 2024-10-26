<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let seconds = 5;

  // If registering successfully, redirect to the login page after a 5-second countdown
  onMount(() => {
    const countdown = () => {
      seconds -= 1;

      if (seconds > 0) {
        setTimeout(countdown, 1000);
      }
      if (seconds === 0) {
        goto("/auth/login", { invalidateAll: true, replaceState: true });
      }
    };
    countdown();
  });
</script>

<div class="container">
  <div class="box">
    <div class="input-box" id="icon">
      <h1>Awesome !</h1>
    </div>

    <div class="input-box">
      <p>You have signed up successfully!</p>
    </div>

    <div class="input-box">
      <p>Please login...</p>
    </div>

    <div class="input-box">
      <img src="/loading.gif" alt="Animated GIF" />
    </div>

    <div class="input-box">
      <span>From here to explore the world in </span>
      <span id="seconds">{seconds} </span>
      <span>s.</span>
    </div>
  </div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap");

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
  }

  .container {
    display: flex;
    justify-content: center;
  }

  .input-box {
    width: 100%;
    margin: 5px 0;
    color: #3d3b40;
    font-size: 1.5em;
  }

  #icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  .box {
    text-align: center;
    color: #164863;
    margin-top: 200px;
  }

  #seconds {
    font-size: 1.6em;
    padding: 0 5px;
    color: black;
    font-weight: 400;
  }
</style>
