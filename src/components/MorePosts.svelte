<script>
  import { onMount } from 'svelte';

  let randomPosts = [];

  // Replace this slug with the current post's slug from your URL
  export let currentSlug;

  onMount(async () => {
      try {
          const response = await fetch(`http://localhost:8000/detail/random-posts/${currentSlug}/`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
              credentials: 'include',
          });

          if (!response.ok) {
              throw new Error('Failed to fetch random posts');
          }

          randomPosts = await response.json();
      } catch (error) {
          console.error('Error fetching random posts:', error);
      }
  });
</script>

{#if randomPosts.length > 0}
  <div class="divider"></div> <!-- Divider line -->
  <h2 class="more-from-heading text-center">More from Chistev</h2>

<div class="more-posts-container">
      {#each randomPosts as post}
          <div class="post-card">
              {#if post.image}
                  <img src={post.image} alt={post.title} />
              {/if}
              <div class="post-card-title">{post.title}</div>
              <div class="post-card-meta">{new Date(post.created_at).toLocaleDateString()}</div>
              <div class="post-card-content">{@html post.content}</div>
              <div class="post-icons">
                  <div class="post-icons-left">
                      <span><i class="bi bi-hand-thumbs-up-fill"></i> {post.likes}</span>
                      <span><i class="bi bi-chat-right-fill"></i> {post.comments}</span>
                  </div>
                  <div class="post-icons-right">
                      <i class="bi bi-share-fill"></i>
                  </div>
              </div>
          </div>
      {/each}
</div>
{/if}
<style>
  .more-posts-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    max-width: 800px;
    margin: 0 auto;
    background-color: #f9f9f9;
  }

  .post-card {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 10px;
    max-width: 300px;
    margin: 0 auto;
  }

  .post-card img {
    width: 100%;
    border-radius: 8px;
    height: 150px;
    object-fit: cover;
  }

  .post-card-title {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #242424;
    margin: 10px 0;
  }

  .post-card-meta {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 400;
    line-height: 18px;
    font-size: 12px;
    color: #6b6b6b;
    margin-bottom: 10px;
  }

  .post-card-content {
    font-family: Georgia, Cambria, 'Times New Roman', Times, serif;
    font-weight: 400;
    font-size: 14px;
    color: #242424;
    line-height: 22px;
  }

  .post-icons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.9em;
    color: #777;
  }

  .post-icons-left {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .post-icons-left span {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .post-icons i {
    font-size: 1.5em; /* Uniform size for all icons */
  }

  /* Media query for smaller screens */
  @media (max-width: 600px) {
    .more-posts-container {
      grid-template-columns: 1fr; /* Stack cards vertically */
    }

    .post-card {
      max-width: 100%; /* Ensure cards take full width on smaller screens */
      margin-bottom: 20px; /* Add space between cards */
    }
  }
</style>

