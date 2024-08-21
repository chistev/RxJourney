<script>
  import { onMount } from 'svelte';
  let searchQuery = '';
  let posts = [];
  let isLoading = true;
  let noResults = false;

  // Fetch posts based on the search query
  async function fetchSearchResults() {
    console.log('Fetching search results...');
    isLoading = true;
    console.log('isLoading set to true');
    
    try {
      const response = await fetch(`http://localhost:8000/home/search?query=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      console.log('Received data:', data);

      if (data && data.length > 0) {
        posts = data;
        noResults = false;
        console.log('Posts updated:', posts);
      } else {
        noResults = true;
        console.log('No results found');
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      isLoading = false;
      console.log('isLoading set to false');
    }
  }

  onMount(() => {
    console.log('Component mounted');
    const urlParams = new URLSearchParams(window.location.search);
    searchQuery = urlParams.get('query') || '';
    console.log('Search query:', searchQuery);
    
    if (searchQuery) {
      fetchSearchResults();
    } else {
      console.log('No search query provided');
      isLoading = false;
    }
  });
</script>
  
  <div class="container">
    <h1>Search Results for "{searchQuery}"</h1>
  
    {#if isLoading}
      <p>Loading...</p>
    {:else}
      {#if noResults}
        <p>No posts found matching your search query.</p>
      {:else}
        <ul class="article-list mt-5">
          {#each posts as post}
            <li class="article-item" on:click={() => window.location.href = `/${post.slug}`}>
              <div class="article-content">
                <h2>{post.title}</h2>
                <p>{@html post.content.slice(0, 250) + '...'}</p>
                <div class="article-meta">
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  <span><i class="bi bi-hand-thumbs-up-fill"></i> {post.total_likes}</span>
                  <span><i class="bi bi-chat-right-fill"></i> {post.comments.length}</span>
                </div>
              </div>
              {#if post.image}
                <img src={post.image} alt={post.title} />
              {/if}
            </li>
          {/each}
        </ul>
      {/if}
    {/if}
  </div>
  
  <style>
    /* Reuse the styles from HomeContent.svelte */
    .article-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  
    .article-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 20px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 20px;
      max-width: 700px;
      cursor: pointer;
    }
  
    .article-item img {
      width: 150px;
      height: 100px;
      object-fit: cover;
      margin-left: 20px;
    }
  
    .article-content {
      flex: 1;
    }
  
    .article-content p {
      font-size: 16px;
      color: #191919;
    }
  
    .article-meta {
      display: flex;
      gap: 15px;
      font-size: 0.9em;
      color: #777;
    }
  </style>
  