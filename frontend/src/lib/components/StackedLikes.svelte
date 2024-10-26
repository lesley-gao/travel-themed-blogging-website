<!-- likes function with stacked user avatar, used in every article card -->
<script>
  import { LIKES_URL } from "$lib/js/api-urls.js";
  import "boxicons/css/boxicons.min.css";
  import { onMount } from "svelte";
  export let articleId;
  //this is to ensure user can only like/dislike an article on it's own page
  //not on the all articles page
  export let isOnSingleArticlePage;
  let isLoggedIn;
  let isUserLiked;
  let likeCount = 0;
  let likeAvatars = [];
  //fetch the likes count to display to all users
  //then depending on if this current user is logged in,
  //he can see if he has likes the article
  onMount(async () => {
    const response = await fetch(`${LIKES_URL}/${articleId}`, { credentials: "include" });
    const data = await response.json();

    likeCount = data[0].like_count;
    if (data[0].like_avatars) {
      likeAvatars = data[0].like_avatars.split(",");
    }

    const isLikedResponse = await fetch(`${LIKES_URL}/${articleId}/like`, {
      credentials: "include"
    });
    if (isLikedResponse.ok) {
      isLoggedIn = true;
      isUserLiked = await isLikedResponse.json();
    } else {
      isLoggedIn = false;
      isUserLiked = false;
    }
  });
  //use svelte's reactivity to update the like count timely
  let updatedLikeCount = likeCount;
  let updatedLikeAvatars = likeAvatars;
  $: likeCount = updatedLikeCount;
  $: likeAvatars = updatedLikeAvatars;

  let response;
  async function handleLikes() {
    if (isOnSingleArticlePage) {
      isUserLiked = !isUserLiked;
      //if users want to like an article
      if (isUserLiked) {
        response = await fetch(`${LIKES_URL}/${articleId}`, {
          method: "POST",
          credentials: "include"
        });
      }
      //if users want to dislike an article
      else {
        response = await fetch(`${LIKES_URL}/${articleId}`, {
          method: "DELETE",
          credentials: "include"
        });
      }
      //update the newest counts
      if (response.ok) {
        const res = await response.json();
        updatedLikeCount = res[0].like_count;
        if (res[0].like_avatars) {
          updatedLikeAvatars = res[0].like_avatars.split(",");
        } else {
          updatedLikeAvatars = [];
        }
      } else {
        console.error("Failed to update like count");
      }
    }
  }

  let display = false;
  function diplayMessage() {
    if (isOnSingleArticlePage) {
      display = !display;
    }
  }
</script>

<div class="whole">
  <div>
    {#if isLoggedIn}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      {#if isUserLiked}
        <i on:click={handleLikes} class="bx bxs-heart" style="color:#e11313" />
      {:else}
        <!-- Use a different heart icon when not liked -->
        <i on:click={handleLikes} class="bx bx-heart" />
      {/if}
    {:else}
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <i on:click={diplayMessage} class="bx bx-heart" />
    {/if}
    <span class="like-count" style="color: #D24545; font-size:1.1em;">{likeCount}</span>
    <!-- display if user want to interact with likes but not logged in -->
    {#if display}
      <span>Please log in to explore more!</span>
    {/if}
  </div>

  <div class="avatar-stack">
    {#each likeAvatars as avatar}
      <img src={avatar} alt="avatar" />
    {/each}
  </div>
</div>

<style>
  .whole {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  i.bx-heart {
    font-size: 24px;
    color: #d24545;
  }

  i.bxs-heart {
    font-size: 24px;
  }

  .avatar-stack {
    display: flex;
    align-items: center;
  }

  .avatar-stack img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: -15px;
    border: 2px solid #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }
</style>
