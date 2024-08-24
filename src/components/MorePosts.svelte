<script>
  import { onMount, onDestroy } from 'svelte';
  import { postStore } from '../stores/postStore';
  import { formatDate } from '../utils';
  
  let randomPosts = [];
  let currentSlug;

  // Subscribe to the store and extract slug
  const unsubscribe = postStore.subscribe(post => {
      currentSlug = post.slug;
  });

  onMount(async () => {
      if (currentSlug) {
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
      }
  });

  onDestroy(() => {
      unsubscribe();
  });
</script>

{#if randomPosts.length > 0}
  <div class="divider"></div>
  <h2 class="more-from-heading text-center">More from Chistev</h2>

  <div class="more-posts-container">
    {#each randomPosts as post}
      <a href={`/${post.slug}`} class="post-card-link">
        <div class="post-card">
          <div class="post-card-title">{post.title}</div>
          <div class="post-card-meta">{formatDate(post.created_at)}</div>
          <div class="post-card-content">{@html post.content}</div>
        </div>
      </a>
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

  .post-card-link {
    text-decoration: none; 
    color: inherit; 
    display: block; 
  }

  .post-card {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 10px;
    max-width: 300px;
    margin: 0 auto;
    transition: background-color 0.3s; 
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

  .post-card-link:hover .post-card {
    background-color: #e0e0e0; 
    cursor: pointer; 
  }

  /* Media query for smaller screens */
  @media (max-width: 600px) {
    .more-posts-container {
      grid-template-columns: 1fr; /* Stack cards vertically */
    }

    .post-card {
      max-width: 100%; /* Ensure cards take full width on smaller screens */
      margin-bottom: 20px;
    }
  }
</style>
