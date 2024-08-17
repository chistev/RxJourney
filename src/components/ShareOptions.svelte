<script>
    import { onMount, onDestroy } from 'svelte';
  
    export let showShareOptions = false;
    export let toggleShareOptions;
    let linkCopied = false;
  
    async function copyLink() {
      try {
        const currentUrl = window.location.href;
        await navigator.clipboard.writeText(currentUrl);
        linkCopied = true;
  
        // Reset the linkCopied state after 2 seconds
        setTimeout(() => {
          linkCopied = false;
        }, 2000);
      } catch (error) {
        alert('Failed to copy the link. Please try again.');
      }
    }
  
    function closeShareOptions(event) {
      if (!event.target.closest('.share-options') && !event.target.closest('.bi-share-fill')) {
        toggleShareOptions(false);
      }
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
  
  <div class="post-icons-right">
    <i class="bi bi-share-fill" on:click={() => toggleShareOptions(!showShareOptions)}></i>
    {#if showShareOptions}
      <div class="share-options">
        <div class="share-option" on:click={copyLink}>
          <i class="bi bi-link-45deg"></i> Copy link
        </div>
        <div class="share-option">
          <i class="bi bi-twitter"></i> Share on Twitter
        </div>
        <div class="share-option">
          <i class="bi bi-facebook"></i> Share on Facebook
        </div>
      </div>
    {/if}
  
    {#if linkCopied}
      <div class="copy-notification">Link copied to clipboard!</div>
    {/if}
  </div>
  
  <style>
    .share-options {
      position: absolute;
      top: 100%;
      right: 0;
      background-color: #fff;
      border: 1px solid #e0e0e0;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      padding: 10px;
      z-index: 10;
    }
  
    .share-option {
      font-family: system-ui, 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-weight: 400;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px;
      cursor: pointer;
      color: #191919;
    }
  
    .share-option:hover {
      background-color: #f0f0f0;
    }
  
    .share-option i {
      font-size: 1.2em;
    }
  
    .copy-notification {
      position: absolute;
      top: -20px;
      right: 0;
      background-color: #28a745;
      color: white;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 12px;
    }
  </style>
  