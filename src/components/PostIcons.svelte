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
    align-items: right;
    justify-content: right;
    font-size: 16px;
    color: #777;
    position: relative;
    cursor: pointer;
  }
</style>
