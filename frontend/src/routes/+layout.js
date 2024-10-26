import { USER_URL } from "$lib/js/api-urls.js";

/**
 * This load function will load data shared across all pages - the login data.
 *
 * When first loading up this website, we will check if we are logged in or not by fetching from /api/users/me. If we
 * manage to get a 200 OK response, we will store the provided user data. Otherwise, we will set it to undefined.
 */
export async function load({ fetch }) {
  const response = await fetch(`${USER_URL}/me`, { credentials: "include" });
  if (response.status === 401) return { isLoggedIn: false };

  const user = await response.json();

  const isLoggedIn = !!user;
  return { user, isLoggedIn };

}


