import { writable } from 'svelte/store';

export const postStore = writable({
  id: null,
  title: '',
  image: '',
  slug: '',
  content: '',
  total_likes: 0,
  comments: 0,
  liked: false, // Add 'liked' to keep track of like status
});
