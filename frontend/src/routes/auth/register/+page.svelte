<!-- Sign up page -->
<script>
  import "boxicons/css/boxicons.min.css";
  import { goto } from "$app/navigation";
  import { USER_URL } from "$lib/js/api-urls.js";
  //make a seperate module to import all images, increase readability
  import avatars from "$lib/js/avatars.js";

  export let data;

  let showAvatarList = false;
  let avatar_path = avatars[1];

  let username = "";
  let password = "";
  let confirmPass = "";
  let email = "";
  let firstName = "";
  let lastName = "";
  let birthday = "";
  let description = "";

  let error = false;
  let isUsernameTaken = false;
  /**
   * Validation checks for user registration form
   * - username: Minimum length of 4 characters and if the username is taken
   * - password: Minimum length of 8 characters, at least one uppercase, one lowercase, one digit, and one special character
   * - passwordsMatch: Check if password matches the confirmed password
   * - email: Check if the email follows a basic email format
   * -birthday: the choosen date is no more than current date
   * - allValid: Check if all validation criteria are met
   */
  $: usernameValid = username.length >= 4;
  $: passwordValid =
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^\w]/.test(password);
  $: passwordsMatch = password === confirmPass;
  $: emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  $: allValid =
    usernameValid &&
    !isUsernameTaken &&
    passwordValid &&
    passwordsMatch &&
    firstName.length > 0 &&
    lastName.length > 0 &&
    emailValid &&
    description.length > 0 &&
    new Date(birthday) < new Date();

  function checkUsername() {
    isUsernameTaken = data.usernames.find((ele) => ele.username === username);
  }

  function toggleAvatarList() {
    showAvatarList = !showAvatarList;
  }

  function handleAvatarClick(avatarUrl) {
    avatar_path = avatarUrl;
    toggleAvatarList();
  }

  /**
   * handle user registration form submission
   * Resets the error state, logs user input data, and sends a POST request to the server.
   * Handles the server response, setting the error state or displaying a success message.
   */
  async function handleSubmit() {
    error = false;
    const response = await fetch(`${USER_URL}/register`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        email,
        avatar_path,
        firstName,
        lastName,
        birthday,
        description
      })
    });

    if (response.status === 422) {
      error = true;
    } else if (response.status === 204) {
      goto("/auth/register/success", { invalidateAll: true, replaceState: true });
    }
  }

  //disable the button when the info does't meet the rules
  let isButtonDisabled = false;
  function disableButton() {
    isButtonDisabled = true;
  }
</script>

<svelte:head>
  <title>Signup</title>
</svelte:head>

<div class="container">
  <form on:submit|preventDefault={handleSubmit}>
    <div class="login">
      <span class="close">
        <a href="/"> <i class="bx bx-window-close" /></a>
      </span>
      <h1>Sign Up</h1>

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
                style="width: 90px; height: 90px; border-radius: 50% ; object-fit: cover;"
              />
            </label>
          {/each}
        </div>
      </div>
      <!-- input boxes for users to fill in their personal info-->
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

      <!-- if username is already taken, informing the user immediately-->
      {#if isUsernameTaken}
        <div class="verify" id="username">
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
          <p>the email format is incorrect!</p>
        </div>
      {/if}

      {#if new Date(birthday) > new Date()}
        <div class="verify" id="birthday">
          <i class="bx bx-error" />
          <p>Date is invalid,please choose again!</p>
        </div>
      {/if}

      <!-- Verify the password & re-enter password,if not match, informing user immediately-->

      <div class="innerbox">
        <div class="input-box">
          <input type="password" placeholder="Password" bind:value={password} required />
          <i class="bx bx-low-vision" />
        </div>
        {#if password.length > 0 && !passwordValid}
          <div class="verify">
            <i class="bx bx-error" />
            <p>
              Password should contain at least 8 characters, including uppercase, lowercase,
              numbers, and special characters.
            </p>
          </div>
        {/if}

        <div class="input-box">
          <input type="password" placeholder="Confirm password" bind:value={confirmPass} required />
          <i class="bx bxs-lock-alt" />
        </div>

        {#if password.length > 0 && confirmPass.length > 0 && !passwordsMatch}
          <div class="verify">
            <i class="bx bx-error" />
            <p>Passwords do not match!</p>
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

        <!-- All the info must meet the requirements, otherwise users are not allowed to submit -->

        {#if !allValid}
          <button on:click={disableButton} id="invalid-btn" type="button" class="btn"
            >Sign Up</button
          >
        {:else}
          <button type="submit" id="valid-btn" class="btn">Sign Up</button>
        {/if}

        <div class="register-link">
          <p>
            Already have an account? <a href="/auth/login" style="text-decoration: underline;"
              >Login</a
            >
          </p>
        </div>
      </div>
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
    background-size: auto;
  }

  .login {
    position: relative;
    width: 600px;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(20px);
    color: white;
    border-radius: 10px;
    padding: 30px 40px;
    margin: 160px auto;
    max-width: 800px; /* Set a maximum width for the login container */
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
    scrollbar-width: thin; /* style for scrollbar */
    scrollbar-color: rgba(121, 180, 183, 0.5) #e5e0da;
    background-color: rgba(180, 175, 175, 0.8);
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

  .avatar-list label img {
    width: 100%;
    height: auto;
    border-radius: 50%;
  }

  .avatar-list label:hover {
    background-color: rgb(176, 235, 241);
  }

  .login .close {
    position: absolute;
    top: 0;
    right: 0;
    width: 45px;
    height: 45px;
    color: white;
    font-size: 2em;
    cursor: pointer;
  }

  .login h1 {
    font: size 36px;
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
    color: white;
    padding: 20px;
    transition: all 0.3s ease;
  }

  .input-box input:focus {
    border-color: #79b4b7;
  }

  .input-box input::placeholder {
    color: white;
  }

  .input-box i {
    position: absolute;
    right: 40px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
  }

  .login .btn {
    width: 96%;
    height: 45px;
    background: #79b4b7;
    border: none;
    outline: none;
    border-radius: 40px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    font-size: 16px;
    color: white;
    font-weight: 500;
    margin-top: 10px;
  }

  #invalid-btn {
    cursor: not-allowed;
    font-size: 16px;
    font-weight: 500;
  }
  #valid-btn:hover {
    background: white;
    color: #79b4b7;
  }

  .login .register-link {
    font-size: 14.5px;
    text-align: center;
    margin: 20px 0 15px;
  }

  .register-link p a {
    color: white;
    text-decoration: none;
    font-weight: 600;
  }

  .register-link p a:hover {
    text-decoration: underline;
  }

  .close a {
    color: white;
    text-decoration: none;
  }

  .verify {
    display: flex;
    font-size: 14.5px;
    margin: -5px 0 5px;
    background: #79b4b7;
    color: rgb(51, 49, 49);
    font-size: 13px;
    font-style: italic;
    padding: 5px 5px;
    width: 95%;
    top: 50%;
  }

  #username {
    top: 400px;
  }

  .verify#email {
    bottom: 400px;
    width: 45%;
  }

  .verify#birthday {
    top: 60%;
    left: 50%;
    margin-left: 250px;
    width: 50%;
  }

  .verify p {
    padding: 0 5px;
  }

  /* add media query: make the login container take the full width
 when the screen width is lower than 800px*/
  @media (max-width: 800px) {
    .login {
      width: 100%;
    }
  }
</style>
