<script>
  import { onMount } from 'svelte';
  import ArticleList from '../../components/ArticleList.svelte'
  
  let searchQuery = '';
  let posts = [];
  let isLoading = true;
  let noResults = false;

  async function fetchSearchResults() {
    console.log('Fetching search results...');
    isLoading = true;
    console.log('isLoading set to true');
    
    try {
      const response = await fetch(`https://rxjourneyserver.pythonanywhere.com/home/search?query=${encodeURIComponent(searchQuery)}`);
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

  function handlePostClick(slug) {
    window.location.href = `/${slug}`;
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

<svelte:head>
  <title>Search Results for "{searchQuery}" | RxJourney</title>
  <meta name="description" content="Search results for '{searchQuery}'" />
</svelte:head>

<div class="container">
  <h1 class="mb-5">Search Results for "{searchQuery}"</h1>

  {#if isLoading}
    <p>Loading...</p>
  {:else}
    {#if noResults}
      <p>No posts found matching your search query.</p>
    {:else}
      <ArticleList {posts} onPostClick={handlePostClick} />
    {/if}
  {/if}
</div>
