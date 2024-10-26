<!--This component will be used in the edit-article & create-article page -->
<script>
  import Editor from "@tinymce/tinymce-svelte";
  import { UPLOAD_URL, ARTICLE_URL } from "$lib/js/api-urls.js";
  import { goto } from "$app/navigation";
  import { invalidate } from "$app/navigation";
  import { PUBLIC_IMAGES_URL } from "$env/static/public";
  import dayjs from "dayjs";

  // creat article varibles
  export let author_id = "";
  export let content = "";
  export let title = "";
  export let icon_path = "";
  export let abstract = "";
  export let category = "";
  export let edit_time;
  export let id;

  //set conditions used for create or edit article
  export let isCreate = false;
  export let isEdit = false;

  let selectedImage;
  let successMessage = "";
  let errorMessage = "";
  let response;
  let filesToUpload;
  let newId;
  let imageURL;

  $: selectedImage = imageURL;

  let categories = ["America", "Europe", "Asia", "Africa", "Oceania"];
  const create_time = dayjs().format("YYYY-MM-DD");
  let currentImageUrl = icon_path.length > 0 ? `${PUBLIC_IMAGES_URL}/${icon_path}` : null;

  $: allValid = title.length > 0 && abstract.length > 0 && category.length > 0;

  // Configuration  for the TinyMCE editor
  const apiKey = "prqtukn9b1mgmxqt0wgg9wlpe2q9byfabl2ddw9z98ab6fcd";
  const conf = {
    plugins: "lists image wordcount",
    file_picker_types: "file image media",
    skin: "oxide-dark",
    content_css: "light",
    width: 700,
    height: 500,
    toolbar:
      "undo redo styles bold underline italic bullist numlist  | outdent indent  wordcount alignleft aligncenter alignright alignjustify"
  };

  //to display a preview of the selected image before the actual upload.
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      imageURL = URL.createObjectURL(file);
      currentImageUrl = imageURL;
    }
  };

  //delete image function
  const deleteImage = () => {
    icon_path = "";
    filesToUpload = null;
    currentImageUrl = null;
    imageURL = null;
  };

  function handleCategoryChange(event) {
    category = event.target.value;
  }

  //To limit the word count of the "abstract" to be within 100 words:
  let wordCount = 0;
  const maxWords = 100;
  const handleAbstractChange = () => {
    wordCount = abstract.split(/\s+/).filter(Boolean).length;

    if (wordCount > maxWords) {
      abstract = abstract.split(/\s+/).slice(0, maxWords).join(" ");
    }
  };

  /**
   * Send POST request to create a new article. Parse the response to get the ID of the newly created article
   * Handle success and failure messages,  and navigate to the new article after 2 seconds
   */
  async function createArticleData() {
    const responseArticle = await fetch(ARTICLE_URL, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        author_id,
        title,
        abstract,
        content,
        category,
        create_time,
        edit_time,
        icon_path: icon_path
      })
    });

    newId = await responseArticle.json();

    if (responseArticle.status === 201) {
      successMessage = "Article saved successfully!";
      errorMessage = "";

      setTimeout(() => {
        successMessage = "";
        goto(`/articles/${newId}`, { invalidateAll: true, replaceState: true });
      }, 2000);
    } else {
      errorMessage = "Failed to save article. Please try again.";
      successMessage = "";
    }
  }

  /**
   * Send PATCH request to update article data.Check if update was successful，Invalidate cache for the updated article
   * Handle success and failure messages and navigate to the updated article after 2 seconds
   */

  async function updateArticleData() {
    const response = await fetch(`${ARTICLE_URL}/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        abstract,
        content,
        category,
        edit_time,
        icon_path: icon_path,
        id
      })
    });

    const success = response.status === 204;

    if (success) {
      invalidate(`${ARTICLE_URL}/${id}`);
    }
    if (response.status === 204) {
      successMessage = "Article updated successfully!";
      errorMessage = "";

      setTimeout(() => {
        successMessage = "";
        goto(`/articles/${id}`, { invalidateAll: true, replaceState: true });
      }, 2000);
    } else {
      errorMessage = "Failed to update article. Please try again.";
      successMessage = "";
    }
  }

  /**
   * Handles the form submission :If user choose a cover image, then upload the image and submit along with the article
   * Else calls createArticleData or updateArticleData directly based on the operation (isCreate or isEdit).
   **/
  async function handleSubmit(e) {
    const formData = new FormData();

    //upload the cover image
    if (filesToUpload && filesToUpload.length > 0) {
      formData.append("image-file", filesToUpload[0]);
      response = await fetch(UPLOAD_URL, {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        const serverResponse = await response.json();
        icon_path = serverResponse.imageUrl;
        if (isCreate) await createArticleData();
        if (isEdit) await updateArticleData();
      }
    } else {
      if (isCreate) await createArticleData();
      if (isEdit) await updateArticleData();
    }
  }
</script>

<!-- title input box -->
<div class="container">
  <form on:submit|preventDefault={handleSubmit}>
    <div class="input-box">
      <input
        type="text"
        class="title-input"
        placeholder="Please input your Article title here "
        bind:value={title}
        maxlength="50"
        required
      />
    </div>

    <!-- Selected Category Box -->
    <div class="input-box" id="category">
      <label for="category">Article category:</label>
      <select id="category" bind:value={category} on:change={handleCategoryChange}>
        {#each categories as category (category)}
          <option value={category} style="text-align: left;">{category}</option>
        {/each}
      </select>
    </div>

    <!-- Insert Tiny editor to input the content  -->
    <div class="editor-container">
      <Editor {apiKey} {conf} bind:value={content} />
    </div>

    <!-- Users are able to choose upload the cover image or not When create the article -->
    <!--Delete or change the current image when edit the article -->
    <div class="imageType">
      {#if isCreate}
        <span class="coverImage">Upload cover image </span>
      {/if}

      {#if isEdit}
        <span class="coverImage">Change cover image</span>
      {/if}
      <span class="currentImage">Current image</span>
    </div>
    <div class="combine">
      <div class="imageBox">
        <div class="image">
          <input
            type="file"
            multiple={false}
            name="image-file"
            accept="image/png, image/jpeg"
            style="max-width: 300px; max-height: 200px; font-size:1em;"
            placeholder="Upload Cover Image"
            on:change={handleImageChange}
            bind:files={filesToUpload}
          />

          {#if selectedImage}
            <img src={selectedImage} alt="" />
          {/if}
        </div>
      </div>
      <div class="imageBox">
        <div class="image">
          <button class="delete-button" type="button" on:click={deleteImage}
            >Delete current Image
          </button>

          {#if currentImageUrl}
            <img src={currentImageUrl} alt="" />
          {/if}
        </div>
      </div>
    </div>

    <!-- Abstract input box -->
    <p class="abstract">Abstract</p>
    <div class="input-box" id="abstractBox">
      <textarea
        type="text"
        class="abstract-textarea"
        placeholder="Please input article abstract within 100 words."
        bind:value={abstract}
        rows="“5”"
        wrap="soft"
        on:input={handleAbstractChange}
        required
      />
    </div>

    <!-- reminder information if the article created or updated successfully!  -->
    {#if successMessage}
      <div class="input-box">
        <p>{successMessage}</p>
      </div>
    {/if}
    {#if errorMessage}
      <div class="input-box">
        <p>{errorMessage}</p>
      </div>
    {/if}

    <div class="buttonBox">
      <a href="/users/about"> <button class="btn" type="button" id="cancelBtn">Cancel</button></a>
      {#if allValid}
        <div class="button-container">
          <button class="btn" type="submit">Submit</button>
        </div>
      {:else}
        <div class="button-container">
          <button class="btn" type="button" id="submitBtn" disabled
            >Please fill in all required fields</button
          >
        </div>
      {/if}
    </div>
  </form>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100&display=swap");

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Montserrat", sans-serif;
    font-weight: 900;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: rgb(1, 17, 47);
    margin-bottom: 50px;
  }

  .title-input {
    margin-top: 30px;
    padding: 20px 20px;
    height: 50px;
    margin-right: 20px;
  }

  #category {
    text-align: right;
    height: 40px;
    margin-right: 20px;
  }

  select {
    border-radius: 5px;
    width: 100px;
  }

  .coverImage {
    padding: auto;
    margin-bottom: 5px;
  }

  .combine {
    display: flex;
  }

  .imageBox {
    border: 1px dashed #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-top: 10px;
    position: relative;
    width: 330px;
    height: 200px;
    margin-right: 20px;
    margin-left: 8px;
  }

  .abstract-textarea {
    font-size: 18px;
    color: #555;
    border: 1px solid #ccc;
    padding: 10px;
    margin-top: 10px;
    width: 280px;
    height: 230px;
    resize: none;
  }

  .image {
    max-width: 300px;
    max-height: 180px;
    overflow: hidden;
  }

  img {
    width: 100%;
    object-fit: cover; /* Maintain aspect ratio while covering the container */
    height: 100%;
    margin-top: 10px;
  }

  .input-box {
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
  }

  .title-input {
    font-size: 24px;
    font-weight: bold;
  }

  .input-box input,
  .input-box textarea {
    width: calc(100% - 20px);
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .abstract {
    margin-left: 18px;
    margin-top: 15px;
  }

  .input-box textarea {
    resize: vertical;
    height: 200px;
  }

  .editor-container {
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
  }

  .imageType {
    display: flex;
    margin-right: 20px;
    margin-left: 15px;
    margin-top: 10px;
  }

  .currentImage {
    margin-left: 200px;
  }

  .delete-button {
    background: #0c2d57;
    border-radius: 5px;
    padding: 5px;
    font-size: 0.9em;
    border: 1px solid gray;
    outline: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    color: white;
    margin-right: 40px;
  }

  .delete-button:active {
    background: #15509a;
  }

  .btn {
    background: #0c2d57;
    border: 1px solid gray;
    border-radius: 10px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    font-size: 1em;
    color: white;
    padding: 10px;
    gap: 20px;
  }

  .btn:hover {
    background: #15509a;
    transform: scale(1.1);
  }

  .buttonBox {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    gap: 40px;
  }

  #submitBtn {
    margin-left: 30px;
    cursor: not-allowed;
  }
</style>
