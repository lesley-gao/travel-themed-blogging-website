import { USER_URL } from "$lib/js/api-urls.js";
export let username;



/**
 * Function to send a username validation request to the server.
 * @param {string} username - The username to be validated.
  * @returns {Promise < boolean >} - A promise that resolves to the validation result (true if username is taken, false otherwise).
  */
export async function usernameVerify(username) {
  try {
    // Send a POST request to the username validation endpoint
    const response = await fetch(USER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`Username validation failed with status ${response.status}`);
    }
    const data = await response.json();
    return data.isUsernameTaken;
  } catch (error) {
    console.error('Error during username validation:', error.message);
    throw error;
  }

}







