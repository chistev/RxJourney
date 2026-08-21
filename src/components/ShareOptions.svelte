<script>
  import { onMount, onDestroy } from 'svelte';

  export let showShareOptions = false;
  export let toggleShareOptions;
  let linkCopied = false;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      linkCopied = true;
      setTimeout(() => (linkCopied = false), 2000);
    } catch {
      alert('Failed to copy the link.');
    }
  }

  function closeShareOptions(event) {
    if (!event.target.closest('.share-options') && !event.target.closest('.share-trigger')) {
      toggleShareOptions(false);
    }
  }

  function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?url=${url}`, '_blank');
  }

  function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  }

  onMount(() => {
    if (typeof document !== 'undefined') {
      document.addEventListener('click', closeShareOptions);
    }
  });

  onDestroy(() => {
    if (typeof document !== 'undefined') {
      document.removeEventListener('click', closeShareOptions);
    }
  });
</script>

<div class="share-wrapper">
  <button class="share-trigger" on:click={() => toggleShareOptions(!showShareOptions)} aria-label="Share">
    <i class="bi bi-share"></i>
  </button>

  {#if showShareOptions}
    <div class="share-options">
      <button class="option" on:click={copyLink}>
        <i class="bi bi-link-45deg"></i> Copy link
      </button>
      <button class="option" on:click={shareOnTwitter}>
        <i class="bi bi-twitter-x"></i> Twitter
      </button>
      <button class="option" on:click={shareOnFacebook}>
        <i class="bi bi-facebook"></i> Facebook
      </button>
    </div>
  {/if}

  {#if linkCopied}
    <div class="toast">Link copied</div>
  {/if}
</div>

<style>
  .share-wrapper {
    position: relative;
  }

  .share-trigger {
    background: none;
    border: none;
    font-size: 1.15rem;
    color: #666;
    cursor: pointer;
    padding: 0.4rem;
    border-radius: 6px;
    transition: color 0.2s, background 0.2s;
  }

  .share-trigger:hover {
    color: #111;
    background: #f0f0f0;
  }

  .share-options {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.4rem;
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    padding: 0.4rem;
    min-width: 160px;
    z-index: 20;
  }

  .option {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    width: 100%;
    padding: 0.65rem 0.85rem;
    background: none;
    border: none;
    font-size: 0.9rem;
    color: #222;
    cursor: pointer;
    border-radius: 6px;
    text-align: left;
  }

  .option:hover {
    background: #f5f5f5;
  }

  .toast {
    position: absolute;
    top: -2.2rem;
    right: 0;
    background: #111;
    color: #fff;
    font-size: 0.8rem;
    padding: 0.35rem 0.75rem;
    border-radius: 6px;
    white-space: nowrap;
  }
</style>