
import { USER_URL } from "$lib/js/api-urls.js";

export async function load({ fetch }) {
  const response = await fetch(`${USER_URL}/username`, { credentials: "include" });

  const usernames = await response.json();

  return { usernames };
}