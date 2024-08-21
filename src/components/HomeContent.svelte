<script>
  export let posts;
  import { formatDate } from '../utils';

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  }

  function goToPostDetail(postSlug) {
    window.location.href = `/${postSlug}`;
  }
</script>

<ul class="article-list">
  {#each posts as post}
    <li class="article-item">
      <button
        type="button"
        class="article-link"
        on:click={() => goToPostDetail(post.slug)}
        on:keydown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            goToPostDetail(post.slug);
          }
        }}
      >
        <div class="article-content">
          <h2>{post.title}</h2>
          <p>{@html truncateText(post.content, 250)}</p>
          <div class="article-meta">
            <span>{formatDate(post.created_at)}</span>
          </div>
        </div>
        {#if post.image}
          <img src={post.image} alt={post.title} />
        {/if}
      </button>
    </li>
  {/each}
</ul>

<style>
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
  }

  .article-link {
    display: flex;
    align-items: flex-start;
    width: 100%;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    text-align: left;
  }

  .article-link:focus {
    outline: 2px solid #007bff; 
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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #191919;
  }

  .article-meta {
    display: flex;
    gap: 15px;
    font-size: 0.9em;
    color: #777;
  }

  .article-meta span {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #191919;
  }
</style>
