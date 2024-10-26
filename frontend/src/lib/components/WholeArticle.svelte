<!-- This component is used in single article page to show whole article content-->
<script>
  import { PUBLIC_IMAGES_URL } from "$env/static/public";
  import "boxicons/css/boxicons.min.css";
  import CommentTree from "./CommentTree.svelte";
  import { invalidateAll } from "$app/navigation";
  import { COMMENT_URL } from "$lib/js/api-urls.js";
  import { ARTICLE_URL } from "$lib/js/api-urls.js";
  import { goto } from "$app/navigation";
  import dayjs from "dayjs";
  import StackedLikes from "$lib/components/StackedLikes.svelte";

  export let article;
  export let comments;
  export let user;
  let articleId = article.id;
  let newReply = "";
  let isOnSingleArticlePage = true;

  let successMessage = "";
  let errorMessage = "";

  let showAllComments = false;
  function toggleComments() {
    showAllComments = !showAllComments;
  }
  //count the comments whenever the comments array changed
  let comment_counts = 0;
  $: comment_counts = countComments(comments);

  //recursively count the comment, including the replies to comments and replies to replies
  function countComments(comments) {
    let count = 0;

    for (let i = 0; i < comments.length; i++) {
      if (comments[i].time !== null) {
        count++;
      }
      if (comments[i].replies) {
        count += countComments(comments[i].replies);
      }
    }

    return count;
  }
  //post the new comment to the backend for process
  async function addComment() {
    const time = dayjs().format("YYYY-MM-DD HH:mm:ss");

    const parentId = null;

    let response = await fetch(COMMENT_URL, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ parentId, articleId, newReply, time })
    });
    if (response.ok) {
      //reload data without refresh and reset the editor
      invalidateAll();
      newReply = "";
    }
  }

  let confirmation;

  async function confirmDeletion() {
    confirmation = confirm("Are you sure you want to delete this article?");

    if (confirmation) {
      try {
        const response = await fetch(`${ARTICLE_URL}/${articleId}`, {
          method: "DELETE",
          credentials: "include"
        });

        if (response.ok) {
          successMessage = "Article deleted successfully!";
          errorMessage = "";

          setTimeout(() => {
            successMessage = "";
            goto("/users/about", { invalidateAll: true, replaceState: true });
          }, 2000);
        } else {
          errorMessage = "Failed to delete article. Please try again.";
          successMessage = "";
        }
      } catch (error) {
        console.error("Error during article deletion", error);
      }
    }
  }
</script>

<svelte:head>
  <title>Article</title>
</svelte:head>

<div class="whole">
  <div class="article">
    <h1>{article.title}</h1>
    <!-- top of the article page, showing related info -->
    <div class="author-info">
      <img
        class="avatar"
        src={article.avatar_path}
        alt="avatar of user"
        style="border-radius: 50%;"
      />

      <span><i class="bx bx-user" /> {article.username}</span>
      <span><i class="bx bx-time-five" /> {article.create_time}</span>
      <p class="category"><i class="bx bxs-plane-alt" /> {article.category}</p>
    </div>
    <!-- showing the img user uploaded or default one if not -->
    <img
      class="article-image"
      src={article.icon_path.length > 0
        ? `${PUBLIC_IMAGES_URL}/${article.icon_path}`
        : "/dog on kayak.jpg"}
      alt="ArticleImg"
    />

    <p class="article-content">{@html article.content}</p>

    <!-- component for likes function-->
    <StackedLikes articleId={article.id} {isOnSingleArticlePage} />

    <!-- show the edit/delete article button if user logged in & if he is the author  -->
    {#if user && user.id === article.author_id}
      <div class="like-edit">
        <a href="/articles/{article.id}/edit-article">
          <button class="edit-delete">Edit Article</button></a
        >
        <button class="edit-delete" on:click={confirmDeletion}>Delete Article</button>
      </div>
    {/if}

    {#if successMessage}
      <div class="reminder-mess">
        <p>{successMessage}</p>
      </div>
    {/if}
    {#if errorMessage}
      <div class="reminder-mess">
        <p>{errorMessage}</p>
      </div>
    {/if}
  </div>

  <div class="comments">
    <!-- if user wants to see comments -->
    {#if showAllComments}
      <a href="./" on:click|preventDefault={toggleComments}>Hide {comment_counts} comments</a>
      {#if comment_counts === 0}
        <p>No comment yet. Do you wanna be the first?</p>
      {/if}
      <div class="newComments">
        <!-- if user logged in, show a comment textarea to send comments  -->
        {#if user}
          <p>Join the discussion:</p>
          <div class="comment-div">
            <textarea bind:value={newReply} placeholder="Type your comment here" rows="5" />
            <button
              class="reset-send"
              on:click={() => {
                newReply = "";
              }}>Reset</button
            >
            <button class="reset-send" disabled={newReply.length === 0} on:click={addComment}
              >Send</button
            >
          </div>
          <!-- if user not logged in ,show a message -->
        {:else}
          <p>
            Please log in to comment and reply!
            <a href="/auth/login" style="text-decoration: underline;">Login now</a>
          </p>
        {/if}
      </div>
      <!-- use the comment component the pass the data in -->
      {#each comments as comment (comment.id)}
        <CommentTree {comment} depth={0} {article} {user} />
      {/each}
    {:else}
      <a href="./" on:click|preventDefault={toggleComments}
        >Show {comment_counts} comments <i class="bx bx-message-square-dots" /></a
      >
    {/if}
  </div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap");

  * {
    font-family: "Poppins", sans-serif;
  }

  .whole {
    background-color: rgb(255, 255, 255, 0.3);
    padding: 50px;
    border-radius: 10px;
  }

  .article {
    text-decoration: none;
    color: #1e3d47;
    transition: all 0.3s;
    display: grid;
    gap: 10px;
    padding: 20px;
    border-radius: 10px;
    overflow: hidden;
    word-wrap: break-word;
    word-break:break-word;
  }

  .article-content {
    line-height: 2;
    text-align: justify;
  }

  h1 {
    color: #164863;
    font-size: 1.5rem;
  }

  .author-info {
    display: flex;
    height: 30px;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
  }

  .avatar {
    height: 100%;
    width: 40px;
    height: 40px;
    object-fit: cover;
  }

  .article-image {
    margin: 20px auto;
    width: 80%;
    border-radius: 5px;
  }

  .category {
    color: #fc6736;
  }

  /* style for like & edit area */
  .like-edit {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 30px;
  }

  /* style for comment area */
  .comment-div {
    display: flex;
    align-items: flex-end;
  }

  .newComments textarea {
    width: 80%;
    border-radius: 5px;
  }

  .comments {
    margin-top: 30px;
    & a {
      text-decoration: none;
      color: inherit;
    }

    & a:visited {
      color: inherit;
    }

    & a:hover {
      text-decoration: underline;
    }
  }

  .reminder-mess {
    text-align: center;
    margin: 0 auto;
    background-color: #164863;
    color: white;
    padding: 3px 3px;
    font-size: 16px;
  }

  /* style for all buttons */
  .edit-delete,
  .reset-send {
    height: 30px;
    margin-left: 20px;
    border-radius: 5px;
    border: 0.01px solid gray;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    background-color: white;
    color: #164863;
    text-transform: uppercase;
    transition: all 0.3s;
  }

  .edit-delete {
    width: 120px;
  }

  .reset-send {
    width: fit-content;
  }

  .edit-delete:hover,
  .reset-send:hover {
    background-color: #164863;
    color: white;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  .edit-delete:active,
  .reset-send:active {
    background-color: #2476a2;
    color: white;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  /* add media query */
  @media (max-width: 1200px) {
    .newComments {
      display: grid;
      grid-template-columns: auto;
    }

    .reset-send {
      margin-top: 20px;
      width: fit-content;
    }
  }
</style>
