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
        <div class="article-content">
          <h2>{post.title}</h2>
          <p>{@html post.content.slice(0, 250) + '...'}</p>
          <div class="article-meta">
            <span>{formatDate(post.created_at)}</span>
          </div>
        </div>
        {#if post.image}
          <img src={post.image} alt={post.title} />
        {/if}
      </a>
    </li>
  {/each}
</ul>

{#if nextPage}
  <button on:click={loadMore} class="see-more-button">See More</button>
{/if}
  
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
  text-decoration: none;
  color: inherit;
  background: none;
  border: none;
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

.see-more-button {
font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
font-size: 14px;
font-weight: 700;
color: #242424;
padding: 10px 20px;
border: 2px solid #242424;
border-radius: 20px;
background-color: transparent;
cursor: pointer;
transition: background-color 0.3s, color 0.3s;
}

.see-more-button:hover {
background-color: #242424;
color: #fff;
}

  </style>
  