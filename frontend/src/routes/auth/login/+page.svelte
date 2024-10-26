<!-- login page -->
<script>
  import "boxicons/css/boxicons.min.css";
  import { goto } from "$app/navigation";
  import { AUTH_URL } from "$lib/js/api-urls.js";

  let username = "";
  let password = "";
  let error = false;
  let message = "";

  /**
   * Handle logging in by sending a POST request to /api/auth, with the given username and password.
   * If successful, redirect the user back to 'home ' page. Otherwise, display an error message.
   */
  async function handleSubmit() {
    error = false;
    const response = await fetch(AUTH_URL, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (response.status === 401) {
      error = true;
    } else {
      goto("/users/about", { invalidateAll: true, replaceState: true });
    }
  }
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div class="container">
  <form on:submit|preventDefault={handleSubmit}>
    <div class="login">
      <span class="close">
        <a href="/"> <i class="bx bx-window-close" /></a>
      </span>
      <h1>Login</h1>

      <div class="input-box">
        <input type="text" placeholder="Username" bind:value={username} required />
        <i class="bx bxs-user-circle" />
      </div>

      <div class="input-box">
        <input type="password" placeholder="Password" bind:value={password} required />
        <i class="bx bxs-lock-alt" />
      </div>

      {#if error}
        <div class="error">
          <i class="bx bx-error" />
          <p>Username or password is wrong, please try again.</p>
        </div>
      {/if}

      <div><button type="submit" class="btn">Login</button></div>

      {#if message}
        <div class="success-message">
          {message}
        </div>
      {/if}

      <div class="register-link">
        <p>Don't have an account? <a href="/auth/register" style="text-decoration: underline;">Sign Up Now</a></p>
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
    align-items: center;
    height: 100vh;
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
    color: #fff;
    border-radius: 10px;
    padding: 30px 40px;
    margin-top: 120px;
  }

  .login .close {
    position: absolute;
    top: 0;
    right: 0;
    width: 45px;
    height: 45px;
    color: #fff;
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
    color: #fff;
    padding: 20px 45px 20px 20px;
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
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
  }

  .login .error,
  .success-message {
    position: relative;
    display: flex;
    justify-content: space-between;
    font-size: 14.5px;
    margin: -15px 0 15px;
    background: #79b4b7;
    color: rgb(51, 49, 49);
    font-size: 13px;
    font-style: italic;
    padding: 5px 5px;
    top: 50%;
  }

  .success-message {
    margin-top: 10px;
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

  .btn:hover {
    color: #79b4b7;
    background: white;
  }

  .login .register-link {
    font-size: 14.5px;
    text-align: center;
    margin: 20px 0 15px;
  }

  .register-link p a {
    color: #fff;
    text-decoration: none;
    font-weight: 600;
  }

  .register-link p a:hover {
    text-decoration: underline;
  }

  .close a {
    color: #fff;
    text-decoration: none;
  }
</style>
