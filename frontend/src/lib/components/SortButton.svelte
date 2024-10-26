<!-- Sort function used in the search result page -->
<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let searchResults;
  //options to show in the select box
  let sortOptions = [
    { label: "Choose one option...", value: "default" },
    { label: "Alphabetical (A-Z)", value: "A-Z" },
    { label: "Alphabetical (Z-A)", value: "Z-A" },
    { label: "Newest First", value: "newest" },
    { label: "Oldest First", value: "oldest" }
  ];

  let selectedSortBy;

  function sortResults() {
    let sortedArray = [];
    //the sorting algorithm
    if (selectedSortBy === "A-Z") {
      sortedArray = searchResults.sort((a, b) => a.title.localeCompare(b.title));
    } else if (selectedSortBy === "Z-A") {
      sortedArray = searchResults.sort((a, b) => b.title.localeCompare(a.title));
    } else if (selectedSortBy === "newest") {
      sortedArray = searchResults.sort((a, b) => new Date(b.create_time) - new Date(a.create_time));
    } else if (selectedSortBy === "oldest") {
      sortedArray = searchResults.sort((a, b) => new Date(a.create_time) - new Date(b.create_time));
    }
    //use dispatch to deliver the sorted date to parent
    dispatch("sortArticle", sortedArray);
  }
</script>

<div>
  <label for="sort">Sort By:</label>
  <select id="sort" bind:value={selectedSortBy} style="width: 200px;">
    {#each sortOptions as { label, value }}
      <option {value}>{label}</option>
    {/each}
  </select>
  <button on:click={sortResults} disabled={selectedSortBy === "default"}>Sort</button>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap");

  * {
    font-size: 1em;
    margin-right: 10px;
    height: 40px;
    border-radius: 5px;
    font-family: "Poppins", sans-serif;
  }

  div {
    padding: 20px 30px;
  }

  select,
  button {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
  }

  button {
    width: 80px;
    border: 0.01px solid gray;
    transition: all 0.3s; 
  }

  button:not(:disabled):hover {
    background-color: #164863;
    color: white;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

</style>
