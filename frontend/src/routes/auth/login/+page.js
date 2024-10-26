import { goto } from "$app/navigation";
import { browser } from "$app/environment";


export async function load({ parent }) {
  if (!browser) return;
  const { isLoggedIn } = await parent();
  //designed not to add this page in history
  if (isLoggedIn) {
    goto("/");
  }
}