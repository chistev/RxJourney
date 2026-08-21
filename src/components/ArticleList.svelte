<script>
  import { formatDate } from '../utils';
  export let posts = [];
  export let nextPage;

  async function loadMore() {
    if (!nextPage) return;
    const response = await fetch(nextPage);
    if (!response.ok) return;
    const data = await response.json();
    posts = [...posts, ...data.results];
    nextPage = data.next;
  }
</script>

<ul class="article-list">
  {#each posts as post}
    <li class="article-item">
      <a href={`/${post.slug}`} class="article-link">
        <div class="article-body">
          <h2 class="title">{post.title}</h2>
          <p class="excerpt">{@html post.content.slice(0, 220) + '…'}</p>
          <time class="date">{formatDate(post.created_at)}</time>
        </div>
        {#if post.image}
          <img src={post.image} alt="" class="thumb" loading="lazy" />
        {/if}
      </a>
    </li>
  {/each}
</ul>

{#if nextPage}
  <div class="load-more">
    <button on:click={loadMore} class="see-more">Load more</button>
  </div>
{/if}

<style>
  .article-list {
    list-style: none;
    padding: 0;
    margin: 0;
    max-width: 720px;
  }

  .article-item {
    border-bottom: 1px solid #eee;
    padding: 2.25rem 0;
  }

  .article-item:last-child {
    border-bottom: none;
  }

  .article-link {
    display: flex;
    gap: 1.75rem;
    text-decoration: none;
    color: inherit;
  }

  .article-body {
    flex: 1;
    min-width: 0;
  }

  .title {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 1.45rem;
    font-weight: 700;
    line-height: 1.3;
    color: #111;
    margin: 0 0 0.6rem;
    letter-spacing: -0.02em;
  }

  .excerpt {
    font-family: Georgia, Cambria, 'Times New Roman', Times, serif;
    font-size: 1.05rem;
    line-height: 1.65;
    color: #444;
    margin: 0 0 0.85rem;
  }

  .date {
    font-size: 0.875rem;
    color: #888;
  }

  .thumb {
    width: 140px;
    height: 100px;
    object-fit: cover;
    border-radius: 6px;
    flex-shrink: 0;
  }

  .load-more {
    text-align: center;
    padding: 2.5rem 0 1rem;
  }

  .see-more {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    color: #111;
    background: transparent;
    border: 1.5px solid #ccc;
    border-radius: 999px;
    padding: 0.65rem 1.6rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .see-more:hover {
    background: #111;
    color: #fff;
    border-color: #111;
  }

  @media (max-width: 600px) {
    .article-link {
      flex-direction: column-reverse;
      gap: 1rem;
    }

    .thumb {
      width: 100%;
      height: 180px;
    }

    .title {
      font-size: 1.3rem;
    }
  }
</style>