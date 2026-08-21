<script>
  import ShareOptions from '../components/ShareOptions.svelte';
  let showShareOptions = false;
  function toggleShareOptions(state) {
    showShareOptions = state;
  }
</script>

<div class="post-icons">
  <ShareOptions {showShareOptions} {toggleShareOptions} />
</div>

<style>
  .post-icons {
    display: flex;
    justify-content: flex-end;
  }
</style>