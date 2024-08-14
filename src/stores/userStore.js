import { writable } from 'svelte/store';

// Define a user store
export const userStore = writable({
  isAdmin: false,
  isAuthenticated: false,
  username: ''
});
