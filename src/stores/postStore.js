import { writable } from 'svelte/store';

// Store for the entire post object
export const postStore = writable({
  slug: null,
  title: '',
  content: '',
  image: null,
  createdAt: '',
});
