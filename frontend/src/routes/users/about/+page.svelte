<script>
  import ArticleViewinTimeline from "$lib/components/ArticleViewinTimeline.svelte";
  import { USER_URL } from "$lib/js/api-urls.js";
  import { goto } from "$app/navigation";
  //svelte timeline library, found on svelt.dev live demo when studying
  import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineDot,
    TimelineConnector,
    TimelineContent,
    TimelineOppositeContent
  } from "svelte-vertical-timeline";
  export let data;

  let confirmation;
  // delete user account
  async function confirmDeletion() {
    confirmation = confirm("Are you sure you want to delete your account?");

    if (confirmation) {
      try {
        const response = await fetch(USER_URL, {
          method: "DELETE",
          credentials: "include"
        });

        if (response.ok) {
          // Deletion successful, redirect to home page

          goto("/", {
            replaceState: true,
            invalidateAll: true
          });
        }
      } catch (error) {
        console.error("Error during account deletion", error);
      }
    }
  }
</script>

<svelte:head>
  <title>About Me</title>
</svelte:head>

{#if data.user}
  <div class="whole">
    <!-- left side to show the user info -->
    <div class="left-container">
      <div class="icon">
        <img class="avatar" src={data.user.avatar_path} alt="avatar" style="border-radius: 50%;" />
      </div>
      <h2>{data.user.username}</h2>

      <div class="details">
        <p><i class="bx bx-envelope" /> {data.user.email}</p>
        <p><i class="bx bx-cake" /> {data.user.birthday}</p>
        <p><i class="bx bxs-user-detail" /> {data.user.description}</p>
      </div>

      <div class="buttons">
        <button><a href="/users/edit-profile">Edit Profile</a></button>
        <button><a href="/users/reset-password">Reset Password</a></button>

        <button on:click={confirmDeletion}>
          {#if confirmation}
            Deleting...
          {:else}
            Delete Account
          {/if}
        </button>
        <button><a href="/articles/create-article">Create Article</a></button>
      </div>
    </div>
    <!-- right side: a time line of articles  -->
    <div class="right-container">
      {#if data.articles && data.articles.length > 0}
        <Timeline
          position="alternate"
          style={"border: solid 1px #e3e3e3; padding: 10px 0; border-radius: 10px;"}
        >
          {#each data.articles as article (article.id)}
            <TimelineItem>
              <TimelineOppositeContent slot="opposite-content">
                <h4>{article.create_time}</h4>
                <img id="travel" src="/fly.png" alt="fly" />
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot style={"background-color: #DDF2FD;"} />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <ArticleViewinTimeline {article} />
              </TimelineContent>
            </TimelineItem>
          {/each}
        </Timeline>
      {:else}
        <!-- or a default message  if no articles-->
        <div class="no-article">
          <p>The world is waiting for you to share your travel story.</p>
          <img src="/giphy.gif" alt="img" />
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap");

  .whole {
    display: grid;
    grid-template-columns: 1fr 4fr;
    gap: 5px;
    padding: 30px;
  }

  .left-container {
    border-radius: 10px;
    width: 250px;
    background-color: rgb(255, 255, 255, 0.5);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
    height: fit-content;
    margin-left: 20%;
    padding: 15px;
    transition: all 0.3s;
    margin-top: 140px;
  }

  .icon {
    width: 50%;
    margin-left: 20%;
    padding: 10px;
  }

  .right-container {
    margin-left: 6%;
    margin-top: 120px;
    font-size: 0.9em;
    transition: all 0.3s;
  }

  h4 {
    margin: 0px;
  }

  #travel {
    width: 150px;
    opacity: 0.7;
    border-radius: 10px;
    padding: 80px;
  }

  /* style for the right container when no articles can be displayed*/
  .no-article {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 20px;

    & img {
      opacity: 0.9;
      border-radius: 50%;
      width: 400px;
      margin: 40px auto;
    }

    & p {
      font-size: 1.5em;
      text-align: center;
      font-family: "Poppins", sans-serif;
    }
  }

  /* style for the buttons */
  button a {
    text-decoration: none;
    color: #fefbf3;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  button {
    width: 160px;
    padding: 10px 20px;
    font-size: 1rem;
    text-align: center;
    cursor: pointer;
    border: none;
    border-radius: 10px;
    margin-bottom: 10px;
    background-color: #427d9d;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
    color: #ffffff;
    transition: all 0.3s;
  }

  button:hover {
    background-color: #79b4b7;
    color: #ffffff;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }

  .avatar {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }

  /* add media query */
  @media (max-width: 1200px) {
    .whole {
      grid-template-columns: auto; /* only one column displayed */
    }

    .right-container {
      width: auto;
      margin-top: 0px;
    }
  }
</style>
