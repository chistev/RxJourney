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
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    color: #777;
    position: relative;
  }
</style>
