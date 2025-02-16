<script>
  import ArticleList from './ArticleList.svelte';

  export let posts;
  export let nextPage;
</script>

<ArticleList {posts} {nextPage} /> 