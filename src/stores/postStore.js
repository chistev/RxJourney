import { writable } from 'svelte/store';

// Define the structure of a comment
const defaultComment = {
  id: null,
  username: '',
  avatar: 'https://via.placeholder.com/30', // Default avatar
  time: '',
  text: '',
  likes: 0,
  replies: [], // List of replies
};

// Define the structure of a post
export const postStore = writable({
  id: null,
  title: '',
  image: '',
  slug: '',
  content: '',
  total_likes: 0,
  comments: [], // List of comments
  liked: false, // Add 'liked' to keep track of like status
});

// Helper function to update a post with comments
export function updatePostWithComments(post) {
  postStore.set({
    id: post.id,
    title: post.title,
    image: post.image,
    slug: post.slug,
    content: post.content,
    total_likes: post.total_likes,
    comments: post.comments.map(comment => ({
      ...defaultComment,
      id: comment.id,
      username: comment.username,
      avatar: 'bi-person', // Use Bootstrap icon class
      time: comment.created_at,
      text: comment.content,
      likes: comment.likes,
      replies: comment.replies || [] // Ensure replies are included
    })),
    liked: post.liked
  });
}
