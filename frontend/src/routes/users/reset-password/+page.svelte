
<script>
  import "boxicons/css/boxicons.min.css";
  import { goto } from "$app/navigation";
  import { AUTH_URL } from "$lib/js/api-urls.js";

  //Allow users to reset their password after verifying their current password.
  export let data;
  export let password = "";
  export let newPassword = "";
  export let confirmPass = "";
  const user = data.user;
  const userId = user.id;

  let message = "";
  let error = false;
  let success = false;

  //Password Setting and verifying Rules
  $: passwordValid =
    newPassword.length >= 8 &&
    /[A-Z]/.test(newPassword) &&
    /[a-z]/.test(newPassword) &&
    /[0-9]/.test(newPassword) &&
    /[^\w]/.test(newPassword);
  $: passwordsMatch = newPassword === confirmPass;
  $: allValid =
    passwordsMatch && password.length > 0 && newPassword.length > 0 && confirmPass.length > 0;

  /**
   * Sends a PATCH request to update the user's password.
   * If successful, redirects to the success page and navigates to the login page.
   */
  async function handleSubmit() {
    error = false;
    try {
      const response = await fetch(AUTH_URL, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, password, newPassword })
      });

      if (response.status === 204) {
        success = true;
        const newToken = response.headers.get("authToken");
        goto("/users/reset-password/success", { replaceState: true, invalidateAll: true });
      } else if (response.status === 422) {
        error = true;
        message = "Password is wrong, please try again. ";
      } else {
        console.error("An error occurred while updating the password");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  }
</script>

<svelte:head>
  <title>Change Password</title>
</svelte:head>

<div class="container">
  <form on:submit|preventDefault={handleSubmit}>
    <div class="login">
      <span class="close">
        <a href="/users/edit-profile"> <i class="bx bx-window-close" /></a>
      </span>
      <h1>Change password</h1>

      <div class="input-box">
        <input type="password" placeholder="Current Password" bind:value={password} required />
        <i class="bx bxs-lock-alt" />
      </div>

      {#if error}
        <div class="verify">
          <i class="bx bx-error" />
          <p>{message}</p>
        </div>
      {/if}

      <div class="input-box">
        <input type="password" placeholder="New password" bind:value={newPassword} required />
        <i class="bx bxs-lock-alt" />
      </div>
      {#if newPassword.length > 0 && !passwordValid}
        <div class="verify">
          <i class="bx bx-error" />
          <p>
            Password should contain at least 8 characters, including uppercase, lowercase, numbers,
            and special characters.
          </p>
        </div>
      {/if}

      <div class="input-box">
        <input
          type="password"
          placeholder="Confirm new password"
          bind:value={confirmPass}
          required
        />
        <i class="bx bxs-lock-alt" />
      </div>
      {#if newPassword.length > 0 && confirmPass.length > 0 && !passwordsMatch}
        <div class="verify">
          <i class="bx bx-error" />
          <p>Passwords do not match!</p>
        </div>
      {/if}

      {#if !allValid}
        <button type="button" class="btn" id="invalid">Confirm</button>
      {:else}
        <button type="submit" class="btn" id="done">Confirm</button>
      {/if}

      {#if success}
        <div class="verify" id="success">
          <p>{message}</p>
        </div>
      {/if}

      <div class="register-link">
        <p><a href="/users/edit-profile" style="text-decoration: underline;">Return to edit profile page!</a></p>
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
    width: 420px;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(20px);
    color: white;
    border-radius: 10px;
    padding: 30px 40px;
    margin: 180px;
  }

  .login .close {
    position: absolute;
    top: 0;
    right: 0;
    width: 45px;
    height: 45px;
    color: white;
    background: transparent;
    font-size: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
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
    margin: 30px 0;
  }

  .input-box input {
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 40px;
    font-size: 16px;
    color: white;
    padding: 20px 45px 20px 20px;
  }

  .input-box input::placeholder {
    color: white;
  }

  .input-box i {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
  }

  .login .btn {
    width: 100%;
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
    position: relative;
    display: flex;
    font-size: 14.5px;
    margin: -15px 0 15px;
    background: #79b4b7;
    color: rgb(51, 49, 49);
    font-size: 13px;
    font-style: italic;
    padding: 5px 5px;
    top: 50%;
  }

  #done {
    background: #79b4b7;
    margin-top: 20px;
  }
  
  #done:hover {
    transform: scale(1.1);
    background: white;
    color: #79b4b7;
  }

  #invalid {
    background: white;
    border: none;
    outline: none;
    border-radius: 40px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    cursor: not-allowed;
    font-size: 16px;
    font-weight: 500;
    color: #79b4b7;
  }

  .verify p {
    padding: 0 5px;
  }

  #success {
    margin-top: 10px;
  }
</style>
