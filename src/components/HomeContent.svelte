<script>
  import ArticleList from './ArticleList.svelte';

  export let posts;
</script>

<ArticleList {posts} />

<div class="see-more-button-container">
  <a href="/" class="see-all-button text-decoration-none">See more from Chistev</a>
</div>

<style>
  .see-all-button {
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
  
  .see-all-button:hover {
  background-color: #242424;
  color: #fff;
  }
  </style>
