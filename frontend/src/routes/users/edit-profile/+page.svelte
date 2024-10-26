<script>
  import "boxicons/css/boxicons.min.css";
  import { goto } from "$app/navigation";
  import { invalidate } from "$app/navigation";
  import { USER_URL } from "$lib/js/api-urls.js";
  import { usernameVerify } from "../../../utils/usernameVerify";
  import avatars from "$lib/js/avatars.js";

  //ensure users are able to edit any of their account information(reset-password is in a separate part)

  export let data;
  // Create user variables and initialize the value provided during registration
  const user = data.user;
  let originalUsername = user.username;
  let username = originalUsername;
  let email = user.email;
  let firstName = user.firstName;
  let lastName = user.lastName;
  let birthday = user.birthday;
  let description = user.description;
  let avatar_path = user.avatar_path;

  let error = false;
  let success = false;
  let showAvatarList = false;
  let isUsernameTaken = false;
  let message = "";
  let isButtonDisabled = false;

  //ensure users input valid value
  $: usernameValid = username.length >= 4;
  $: emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  $: allValid =
    usernameValid &&
    emailValid &&
    !isUsernameTaken &&
    firstName.length > 0 &&
    lastName.length > 0 &&
    description.length > 0 &&
    new Date(birthday) < new Date();

  async function checkUsername() {
    isUsernameTaken = (await usernameVerify(username)) && originalUsername !== username;
  }

  function toggleAvatarList() {
    showAvatarList = !showAvatarList;
  }

  function handleAvatarClick(avatarUrl) {
    avatar_path = avatarUrl;
    toggleAvatarList();
  }

  function disableButton() {
    isButtonDisabled = true;
  }

  /**
   * Sends a PATCH request to update user info based on the provided data.
   * If the save is successful, invalidates the user's data in the cache and triggers handleSubmission.
   */

  async function handleSave() {
    error = false;
    success = false;

    const response = await fetch(`${USER_URL}/me`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        firstName,
        lastName,
        birthday,
        description,
        avatar_path
      })
    });

    success = response.status === 204;
    error = !success;

    if (success) {
      invalidate(`${USER_URL}/me`);
    }

    handleSubmission();
  }

  /**
   *  handle the submission result.
   * When Username was updated,redirect to the success page and navigates to the login page.
   * Other info changed successfully,the page will proceed to about me page.
   */

  const handleSubmission = async () => {
    if (success) {
      const msg =
        originalUsername !== username ? "" : "Changes saved successfully! Returning to ABOUT ME...";

      message = msg;

      setTimeout(() => {
        message = "";
        goto(originalUsername !== username ? "/users/edit-profile/success" : "/users/about", {
          replaceState: true
        });
      }, 2000);
    }
  };
</script>

<svelte:head>
  <title>Edit profile</title>
</svelte:head>

<div class="container">
  <form on:submit|preventDefault={handleSave}>
    <div class="login">
      <span class="close">
        <a href="/"> <i class="bx bx-window-close" /></a>
      </span>
      <h1>Edit Profile</h1>

      <!-- Providing pictures for users to choose as avatars.-->

      <div class="avatar-selection">
        <a href="./" class="selected-avatar" on:click|preventDefault={toggleAvatarList}>
          <img src={avatar_path} alt="Default Avatar" />
        </a>
        <div class="select-text">Please click and sroll down to choose your avatar</div>
        <div class="avatar-list" style="display: {showAvatarList ? 'block' : 'none'};">
          <!-- itrates all avatars and put in seperate radio button -->
          {#each avatars as avatar}
            <label>
              <input type="radio" name="avatar" on:change={() => handleAvatarClick(avatar)} />
              <img
                src={avatar}
                alt="Avatar"
                style="width: 80px; height: 80px; border-radius: 50%;object-fit: cover"
              />
            </label>
          {/each}
        </div>
      </div>

      <!-- Input boxes for users to update their profile -->

      <div class="input-box">
        <input
          type="text"
          placeholder="Username"
          bind:value={username}
          on:input={checkUsername}
          maxlength="20"
          required
        />
        <i class="bx bxs-user-circle" />
      </div>

      {#if username.length > 0 && !usernameValid}
        <div class="verify">
          <i class="bx bx-error" />
          <p>Usernames must contain at least 4 characters!</p>
        </div>
      {/if}
      {#if isUsernameTaken}
        <div class="verify">
          <p>This username has been taken!</p>
        </div>
      {/if}

      <div class="inner-container">
        <div class="input-box">
          <input
            type="text"
            placeholder="First Name"
            bind:value={firstName}
            maxlength="20"
            required
          />
        </div>
        <div class="input-box">
          <input
            type="text"
            placeholder="Last Name"
            bind:value={lastName}
            maxlength="20"
            required
          />
        </div>
      </div>

      <div class="inner-container">
        <div class="input-box">
          <input type="email" placeholder="Email" bind:value={email} required />
          <i class="bx bxs-envelope" />
        </div>

        <div class="input-box">
          <input type="date" placeholder="Date of Birth" bind:value={birthday} required />
        </div>
      </div>

      {#if !emailValid && email.length > 0}
        <div class="verify" id="email">
          <i class="bx bx-error" />
          <p>The email format is incorrect!</p>
        </div>
      {/if}

      {#if new Date(birthday) > new Date()}
        <div class="verify" id="birthday">
          <i class="bx bx-error" />
          <p>Date is invalid,please choose again!</p>
        </div>
      {/if}

      <div class="input-box">
        <input
          type="text"
          placeholder="Describe yourself..."
          bind:value={description}
          maxlength="50"
          required
        />
      </div>

      <!-- The submit button only works when all info is valid.-->

      {#if !allValid}
        <div class="register-link">
          <button type="button" class="btn" id="invalid" on:click={disableButton}>Done</button>
        </div>
      {:else}
        <div class="register-link">
          <button type="submit" class="btn" id="done">Done</button>
        </div>
      {/if}

      {#if message}
        <div class="success-message">
          {message}
        </div>
      {/if}

      {#if error}
        <div class="input-box">
          <span class="error">Could not save!</span>
        </div>
      {/if}
    </div>
  </form>
</div>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .container {
    display: flex;
    justify-content: center;
    background: url("/friends.jpg");
    opacity: 0.8;
    background-position: center;
    background-attachment: fixed;
    background-repeat: repeat;
    background-size: cover;
  }

  .login {
    width: 600px;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(20px);
    color: #fff;
    border-radius: 10px;
    padding: 30px 40px;
    margin: 160px auto;
    max-width: 800px;
  }

  .inner-container {
    position: relative;
    display: flex;
    justify-content: space-between;
  }

  .avatar-selection {
    position: relative;
  }
  
  .select-text {
    position: absolute;
    left: 120px;
    top: 40px;
  }

  .selected-avatar {
    width: 100px;
    height: 100px;
    object-fit: cover;
    cursor: pointer;

    transition: border 0.3s ease;
    display: block;
  }

  .selected-avatar img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .avatar-list {
    position: absolute;
    top: 110%;
    left: 0;
    width: 100px;
    max-height: 300px; /* Set a maximum height to enable scrollbar */
    overflow-y: auto; /* Enable vertical scrollbar */
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    z-index: 1;
    background-color: white;
  }

  .avatar-list input {
    display: none;
  }

  .avatar-list label {
    display: block;
    cursor: pointer;
    padding: 5px;
    border-bottom: 1px solid #ddd;
  }

  .avatar-list label:hover {
    background-color: rgb(176, 235, 241);
  }

  .avatar-list label img {
    width: 100%;
    height: auto;
    border-radius: 50%;
  }

  .login .close {
    position: absolute;
    top: 0;
    right: 0;
    width: 45px;
    height: 45px;
    color: #fff;
    font-size: 2em;
    cursor: pointer;
  }

  .login h1 {
    font-size: 36px;
    text-align: center;
  }

  .login .input-box {
    position: relative;
    width: 100%;
    height: 50px;
    padding-right: 20px;
    margin: 10px 0;
  }

  .login .innerbox .input-box {
    margin-bottom: 20px;
  }
  
  .input-box input {
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 40px;
    font-size: 14px;
    color: #fff;
    padding: 20px;
    transition: all 0.3s ease;
  }

  .input-box input:focus {
    border-color: #79b4b7;
  }

  .input-box input::placeholder {
    color: #fff;
  }

  .input-box i {
    position: absolute;
    right: 40px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
  }

  .login .btn {
    width: 100%;
    height: 45px;
    border: none;
    outline: none;
    border-radius: 40px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    font-size: 16px;
    color: white;
    font-weight: 500;
    margin-top: 15px;
  }

  #done {
    background: #79b4b7;
    width: 20%;
    margin-top: 20px;
  }

  #done:hover {
    transform: scale(1.1);
    background: white;
    color: #79b4b7;
  }

  #invalid {
    width: 20%;
    background: #fff;
    border: none;
    outline: none;
    border-radius: 40px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    cursor: not-allowed;
    font-size: 16px;
    font-weight: 500;
    color: rgb(145, 141, 141);
  }

  .login .register-link {
    font-size: 14.5px;
    text-align: center;
    margin: 20px 0 15px;
  }

  #email {
    bottom: 400px;
    width: 45%;
  }

  #birthday {
    top: 60%;
    left: 50%;
    margin-left: 250px;
    width: 50%;
  }

  .close a {
    color: #fff;
    text-decoration: none;
  }

  .verify {
    display: flex;
    width: 93%;
    font-size: 14.5px;
    margin: -5px 0 5px;
    background: #79b4b7;
    color: rgb(51, 49, 49);
    font-size: 13px;
    font-style: italic;
    padding: 5px 5px;
    top: 50%;
    margin-left: 10px;
  }

  .verify p {
    padding: 0 5px;
  }

  .error {
    color: darkred;
    background-color: white;
  }

  .success-message {
    background: #79b4b7;
    padding: 8px 8px;
  }
</style>
