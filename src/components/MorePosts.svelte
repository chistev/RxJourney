<script>
  export let currentSlug;
  import { onMount } from 'svelte';
  import { formatDate } from '../utils';

  let randomPosts = [];

  async function fetchRandomPosts(slug) {
    try {
      const response = await fetch(`https://rxjourneyserver.pythonanywhere.com/detail/random-posts/${slug}/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch random posts');
      randomPosts = await response.json();
    } catch (error) {
      console.error('Error fetching random posts:', error);
    }
  }

  $: if (currentSlug) {
    fetchRandomPosts(currentSlug);
  }

  onMount(() => {
    fetchRandomPosts(currentSlug);
  });
</script>

{#if randomPosts.length > 0}
  <section class="more">
    <h2 class="heading">More from Chistev</h2>
    <div class="grid">
      {#each randomPosts as post}
        <a href={`/${post.slug}`} class="card">
          <h3 class="title">{post.title}</h3>
          <time class="date">{formatDate(post.created_at)}</time>
          <div class="excerpt">{@html post.content}</div>
        </a>
      {/each}
    </div>
  </section>
{/if}

<style>
  .more {
    margin-top: 4rem;
    padding-top: 3rem;
    border-top: 1px solid #eee;
  }

  .heading {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: #111;
    text-align: center;
    margin: 0 0 2rem;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    max-width: 800px;
    margin: 0 auto;
  }

  .card {
    display: block;
    padding: 1.25rem;
    border-radius: 10px;
    background: #fafafa;
    text-decoration: none;
    color: inherit;
    transition: background 0.2s;
  }

  .card:hover {
    background: #f0f0f0;
  }

  .title {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 1.05rem;
    font-weight: 700;
    color: #111;
    margin: 0 0 0.4rem;
    line-height: 1.35;
  }

  .date {
    font-size: 0.8rem;
    color: #888;
    display: block;
    margin-bottom: 0.6rem;
  }

  .excerpt {
    font-family: Georgia, Cambria, 'Times New Roman', Times, serif;
    font-size: 0.95rem;
    line-height: 1.55;
    color: #444;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @media (max-width: 600px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>