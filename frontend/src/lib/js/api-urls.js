import { PUBLIC_API_BASE_URL } from "$env/static/public";


export const BASE_URL = PUBLIC_API_BASE_URL;

// Used for getting / updating info about the currently authenticated user
export const USER_URL = `${BASE_URL}/users`;

// Used for logging in and out
export const AUTH_URL = `${BASE_URL}/auth`;
// Used for fetching articles related data
export const ARTICLE_URL = `${BASE_URL}/articles`;
// Used for fetching comment related data
export const COMMENT_URL = `${BASE_URL}/comments`;
// Used for fetching likes related data
export const LIKES_URL = `${BASE_URL}/likes`;
// Used for upload image
export const UPLOAD_URL = `${BASE_URL}/upload`;
// Used for fetching search results
export const SEARCH_URL = `${BASE_URL}/search`;

