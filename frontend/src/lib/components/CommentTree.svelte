<!-- This component is used in comment section for comment&reply functions-->
<script>
  import "boxicons/css/boxicons.min.css";
  import { openEditor } from "../js/replyStore.js";
  import { COMMENT_URL } from "$lib/js/api-urls.js";
  import { invalidateAll } from "$app/navigation";
  import dayjs from "dayjs";
  //As the last layer reply should not be replied again by users
  //I add a depth prop to count the layers(times of recursion )
  //hide the reply button when depth = 3
  // (designed to have 4 layers, can change easily);
  const MAX_COMMENT_DEPTH = 3;
  export let comment;
  export let depth;
  export let article;
  export let user;
  let articleId = article.id;
  let newReply = "";
  let isEditorOpen;

  // cutomize a svelte store to communicate between different layers of recurssion
  // This is the only way i've tried that can share and modify the same variable
  // so that only one reply editor is opened at one time
  function toggleReply(commentId) {
    openEditor.set(openEditor.value === commentId ? null : commentId);
  }
  $: isEditorOpen = $openEditor === comment.id;

  //add Reply to database
  async function addReply() {
    const time = dayjs().format("YYYY-MM-DD HH:mm:ss");

    const parentId = comment.id;
    let response = await fetch(COMMENT_URL, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ parentId, articleId, newReply, time })
    });
    if (response.ok) {
      //reload data without refresh and close the editor
      invalidateAll();
      newReply = "";
      $openEditor = null;
    }
  }

  //delete comment
  async function deleteComment() {
    const commentId = comment.id;
    const confirmation = confirm("Do you really want to delete this comment?");
    if (confirmation) {
      let response = await fetch(COMMENT_URL, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId })
      });
      if (response.ok) {
        invalidateAll();
      }
    }
  }
</script>

<!-- basic one comment layout -->
<div class="comment">
  <img src={comment.time ? comment.avatar_path : "/avatar-placeholder.png"} alt="Avatar" />
  <span class="username">{comment.time ? comment.username : ""}</span>
  <div class="content">{comment.content}</div>
  <span class="time"
    >{comment.time ? comment.time : ""}
    <!-- hide the reply button if it's deeper than designed nested layer -->
    {#if depth < MAX_COMMENT_DEPTH && comment.time && user}
      <a href="./" on:click|preventDefault={toggleReply(comment.id)}
        >Reply<i class="bx bx-undo" /></a
      >
    {/if}
    <!-- users can delete their own comment or any comments under their article-->
    {#if user && comment.time && (user.id === comment.user_id || user.id === article.author_id)}
      <a href="./" on:click|preventDefault={deleteComment}>Delete this comment</a>
    {/if}
  </span>
  <!-- use store to ensure only one editor open at a time in recursion -->
  {#if isEditorOpen}
    <div class="replyEditor">
      <textarea bind:value={newReply} placeholder="Type your reply" cols="30" />
    </div>
    <div class="replyButton">
      <button on:click={toggleReply}>Cancel</button>
      <button disabled={newReply.length === 0} on:click={addReply}>Send</button>
    </div>
  {/if}
</div>
<!-- recursive structure of all the replies using svelte:self -->
<div class="recursive">
  {#if comment.replies}
    <ul>
      {#each comment.replies as reply}
        <li>
          <svelte:self comment={reply} depth={depth + 1} {article} {user} />
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .comment {
    display: grid;
    grid-template-columns: 30px auto;
    grid-template-rows: repeat(5);
    grid-gap: 10px;
    margin: 10px auto;
  }

  ul {
    list-style: none;
  }

  a {
    color: #5a5959;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .comment img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    grid-area: 1 / 1 / 4 / 2;
  }

  .comment .username {
    font-weight: bold;
    grid-area: 1 / 2 / 2 / 3;
  }

  .comment .content {
    grid-area: 2 / 2 / 3 / 3;
    width: 500px;
    word-wrap: break-word;
  }

  .comment .time {
    color: #888;
    font-size: 0.8em;
    grid-area: 3 / 2 / 4 / 3;
  }

  .comment .replyEditor {
    grid-area: 4 / 2 / 5 / 3;
  }

  .comment .replyButton {
    grid-area: 5 / 2 / 6 / 3;
  }
</style>
