<script>
	import ArticleList from './ArticleList.svelte';

  export let posts;

  function handlePostClick(postSlug) {
    window.location.href = `/${postSlug}`;
  }
</script>

<ArticleList {posts} onPostClick={handlePostClick} />