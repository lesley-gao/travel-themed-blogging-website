<script>
  import "$lib/css/app.css";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { AUTH_URL } from "$lib/js/api-urls.js";
  import { invalidateAll } from "$app/navigation";
  import SearchBox from "$lib/components/SearchBox.svelte";
  import "boxicons/css/boxicons.min.css";

  export let data;

  /**
   * Handle logout by sending a DELETE request to /api/auth, then invalidating.
   */
  async function handleLogout() {
    const response = await fetch(AUTH_URL, {
      method: "DELETE",
      credentials: "include"
    });
    await invalidateAll();
    //force to refresh page, otherwise some UI display that needed logged in
    //(eg:likes status ) won't update
    location.reload();
  }
  //searchBox
  let isSearchBoxOpen = false;

  function toggleSearchBox() {
    isSearchBoxOpen = !isSearchBoxOpen;
  }
  function handleOutsideClick(event) {
    // Close the box if the click is outside the pop-up box
    if (isSearchBoxOpen && !event.target.closest(".box")) {
      toggleSearchBox();
    }
  }
  // Add event listener to handle clicks on the document body
  onMount(() => {
    document.body.addEventListener("click", handleOutsideClick);
  });
  //handle when the search button clicked inside component
  function handleSubmitAndClose(event) {
    const { keyword, selectedSequence, dateMin, dateMax } = event.detail;
    if (keyword) {
      goto(`/articles/search/?keyword=${keyword}&search=${selectedSequence}`, {
        replaceState: true,
        invalidateAll: true
      });
    } else if (dateMin && dateMax) {
      goto(`/articles/search/?dateMin=${dateMin}&dateMax=${dateMax}`, {
        replaceState: true,
        invalidateAll: true
      });
    }
    toggleSearchBox();
  }
</script>

<nav>
  <div class="navigation">
    <div class="banner">
      <a href="/"><img id="bg-img" src="/banner.png" alt="blog your journey" /></a>
    </div>

    <div class="navigation-items">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/articles">Articles</a></li>
        <li>
          <a href="/destinations">Destinations</a>
          <!-- Dropdown menu -->
          <ul class="dropdown-menu">
            <li><a href="/destinations/asia">Asia</a></li>
            <li><a href="/destinations/europe">Europe</a></li>
            <li><a href="/destinations/africa">Africa</a></li>
            <li><a href="/destinations/america">America</a></li>
            <li><a href="/destinations/oceania">Oceania</a></li>
          </ul>
        </li>

        <!-- dropdown list with avatar as main access -->
        <li>
          <div class="avatar-container">
            <!-- login/sign-up icon -->
            <img
              class="avatar"
              src={data.user ? data.user.avatar_path : "/src/lib/assets/avatar/login2.png"}
              alt="avatar"
            />

            <ul class="dropdown-menu">
              {#if data.user}
                <li style="font-size: medium;">Enjoy~ {data.user.username}</li>
                <hr />
                <li><a href="/users/about">About Me</a></li>
                <li><a href="/" on:click={handleLogout}><i class="bx bx-log-out" />Logout</a></li>
              {:else}
                <li><a href="/auth/login"><i class="bx bx-log-in" />Login</a></li>
                <li><a href="/auth/register/">Sign up</a></li>
              {/if}
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</nav>

<!-- used to deactivate the current page when search box open -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="overlay" style={isSearchBoxOpen ? "display: block;" : ""} on:click={toggleSearchBox} />

<div class="wrapper">
  <div class="container">
    <slot />
  </div>

  <!-- search erea -->
  <div class="box">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="searchbox" on:click={toggleSearchBox}>
      <input type="text" class="searchbox_input" placeholder="Click to search" readonly />
      <i id="search-icon" class="bx bx-search" />
    </div>

    {#if isSearchBoxOpen}
      <div class="pop-up">
        <span class="close">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div on:click={toggleSearchBox}><i class="bx bx-window-close" /></div>
        </span>
        <div>
          <SearchBox on:submit={handleSubmitAndClose} />
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap");

  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* style for the whole nav section */
  nav {
    z-index: 999; /* always show on the front*/
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 200px;
    transition: 0.5s ease;
    height: 160px;
  }

  /* style for navigation div */
  .navigation {
    margin-top: 10px;
    position: relative;
    display: flex;
    text-transform: uppercase;
    height: 80px;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }

  /* style for banner div */
  .banner {
    margin-right: 50px;
    width: 300px;
  }

  #bg-img {
    width: 100%;
  }

  /* style for navigation-items div */
  .navigation-items > ul {
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    gap: 30px;
  }

  .navigation-items ul li {
    display: inline-block;
    position: relative;
    text-shadow: 3px 3px 6px rgba(255, 255, 255, 1);
  }

  /* style for navigation-items div elements */
  .navigation-items ul li a {
    display: block;
    text-align: center;
    color: #164863;
    font-size: 1em;
    text-transform: uppercase; /* set all options into uppercase */
    font-weight: 600;
    text-decoration: none;
    font-family: "Montserrat", sans-serif;
    transition: all 0.3s;
  }

  .navigation-items ul li a:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px; /* height of the underline */
    background-color: #747264; /* color of the underline*/
    transition: 0.3s ease;
  }

  .navigation-items ul li a:hover:before {
    width: 100%;
  }

  /* style for the dropdown list */
  .dropdown-menu {
    display: none;
    position: absolute;
    left: 0;
    top: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 5px;
  }

  .navigation-items ul li:hover .dropdown-menu {
    text-align: center;
    display: flex;
    flex-direction: column;
    width: 120px;
  }

  .navigation-items ul li:hover .dropdown-menu li {
    padding: 10px;
  }

  .dropdown-menu ul li {
    width: 100%;
    padding: 10px;
  }

  /* style for avatar */
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid #fff;
  }

  .avatar-container:hover .avatar {
    outline: 1px solid #5e8a8e;
  }

  .avatar-container .dropdown-menu {
    left: -100%;
  }

  /* style to cover the whole page */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: none;
    z-index: 999;
  }

  /* style for search icon */
  .box {
    z-index: 999;
    position: fixed;
    top: 110px;
    right: 20px;
    transform: translateY(-50%);
    width: auto; /* Set to 'auto' to allow dynamic width */
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .searchbox {
    position: relative;
    display: block;
    height: 100px;
    width: 50px;
    max-width: 170px;
    transition: width 0.3s linear;
  }

  .searchbox_input {
    display: block;
    appearance: none;
    width: 100%;
    border: 3px solid white;
    outline: none;
    border-radius: 50px;
    background-color: #9bbec8;
    padding: 15px;
    cursor: pointer;
    transition: max-width 0.3s linear;
  }

  .searchbox_input::placeholder {
    /* Set the placeholder text color and size*/
    color: #9bbec8;
    font-size: 1em;
    font-family: "Poppins", sans-serif;
  }

  #search-icon {
    position: absolute;
    right: calc(53px / 2);
    transform: translate(70%, -170%);
    width: 20px;
    height: 20px;
    pointer-events: none;
  }

  .searchbox:hover .searchbox_input {
    background-color: rgb(255, 255, 255, 0.8);
    padding-right: 50px;
    box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.4);
    max-width: 300px;
  }

  .searchbox:hover {
    border-radius: 50px;
    width: 300px;
  }

  /* style for pop-up search area*/
  .pop-up {
    position: fixed;
    top: 55px;
    right: 4px;
    background: rgba(255, 255, 255, 0.9);
    z-index: 999;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 30px;
  }

  .close {
    position: absolute;
    top: 0;
    right: 0;
    width: 45px;
    height: 45px;
    color: gray;
    font-size: 2em;
    cursor: pointer;
  }

  /* style for the container */
  .container {
    flex-grow: 1;
  }

  @media (max-width: 1000px) {
    nav {
      padding: 12px 20px;
    }

    nav .navigation {
      display: grid;
      grid-template-columns: 1fr;
    }
  }
</style>
