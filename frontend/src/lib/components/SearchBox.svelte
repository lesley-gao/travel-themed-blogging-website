<!-- This component is used in +layout.svelte for search function throughtout the website-->
<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  let selectedSequence;
  let keyword;
  let dateMin;
  let dateMax;

  //throw out the submit search function to parent and pass the search terms
  //so that the parent can close this search box after.
  function handleSubmit() {
    dispatch("submit", { keyword, selectedSequence, dateMin, dateMax });
  }

  $: isButtonDisabled = !(keyword || (dateMin && dateMax));
  $: buttonColor = isButtonDisabled ? "grey" : "#164863";
</script>

<div class="container">
  <div id="message">
    <p style="color:#164863">
      SEARCH ARTICLES BY <span>AUTHOR</span> / <span>TITLE</span> / <span>DATE</span>
    </p>
  </div>
  <!-- search options for user to use one at a time -->
  <form on:submit|preventDefault={handleSubmit}>
    <div class="search-container">
      <select class="menu" name="menu" style="height: 50px" bind:value={selectedSequence}>
        <option value="username">Search by Author</option>
        <option value="title">Search by Title</option>
        <option value="date">Search by Date</option>
      </select>
      <!-- input for keywords or dates -->
      {#if selectedSequence != "date"}
        <input
          type="search"
          id="search-field"
          placeholder="Enter Keyword"
          style="height: 50px"
          bind:value={keyword}
          on:input={() => (isButtonDisabled = !keyword)}
        />
      {:else}
        <div class="date-input">
          <input
            type="date"
            id="date-min"
            style="height: 30px"
            bind:value={dateMin}
            on:input={() => (isButtonDisabled = !(dateMin && dateMax))}
          />
          <i class="bx bx-transfer-alt" />
          <input
            type="date"
            id="date-max"
            style="height: 30px"
            bind:value={dateMax}
            on:input={() => (isButtonDisabled = !(dateMin && dateMax))}
          />
        </div>
      {/if}
    </div>
    <button
      type="submit"
      style="height: 50px; background: {buttonColor}"
      disabled={isButtonDisabled}>Search</button
    >
  </form>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap");

  #message {
    margin-bottom: 10px;
    font-family: "Poppins", sans-serif;
  }

  span {
    color: #7fc7d9;
  }

  form,
  .search-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .menu {
    font-size: 0.9em;
    border-radius: 5px;
    border: 1px solid gray;
    width: 150px;
  }

  .menu,
  #search-field,
  #date-min,
  #date-max,
  button {
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }

  #search-field {
    font-size: 1em;
    border: 1px solid gray;
    border-radius: 5px;
  }

  #search-field::placeholder {
    font-size: 0.9em;
  }

  /* style for search-by-date bar */
  #date-min,
  #date-max {
    height: 5px;
    border-radius: 5px;
    border: 1px solid gray;
  }

  /* style for search button */
  button {
    margin: 0 10px;
    border-radius: 5px;
    border: 1px solid gray;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    font-weight: bold;
    text-transform: uppercase;
    color: white;
    height: 50px;
    width: 100px;
    font-size: 1rem;
  }

  @media (max-width: 800px) {
    form {
      display: grid;
      grid-template-columns: auto;
      gap: 5px;
    }
  }
</style>
