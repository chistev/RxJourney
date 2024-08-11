<script>
  export let posts;
  import {formatDate } from '../utils';

  // Function to truncate text to a specified length
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  }

  // Function to handle click and navigate to the post detail page
  function goToPostDetail(postSlug) {
    window.location.href = `/${postSlug}`;
  }
</script>

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
    max-width: 700px; /* Limit the width of the article item */
    cursor: pointer; /* Indicate that the item is clickable */
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

<ul class="article-list">
  {#each posts as post}
    <li class="article-item" on:click={() => goToPostDetail(post.slug)}>
      <div class="article-content">
        <h2>{post.title}</h2>
        <p>{@html truncateText(post.content, 250)}</p>
        <div class="article-meta">
          <span>{formatDate(post.created_at)}</span>
          <span><i class="bi bi-hand-thumbs-up-fill"></i> {post.likes}</span>
          <span><i class="bi bi-chat-right-fill"></i> {post.comments}</span>
        </div>
      </div>
      {#if post.image}
        <img src={post.image} alt={post.title} />
      {/if}
    </li>
  {/each}
</ul>
