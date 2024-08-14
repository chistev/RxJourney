<script>
  import { postStore } from '../stores/postStore';
  import { fetchCsrfToken } from '../utils';
  import { onDestroy, createEventDispatcher, onMount } from 'svelte';
  import CommentSection from '../components/CommentSection.svelte';

  let post;
  let liked = false;
  let showComments = false;
  let totalComments = 0;
  let showShareOptions = false; // State to track the visibility of the share options
  let linkCopied = false; // State to track if the link has been copied

  const unsubscribe = postStore.subscribe(value => {
      post = value;
      liked = post.liked || false;
      totalComments = post.comments.length;
  });

  const dispatch = createEventDispatcher();

  async function handleLike() {
    liked = !liked;
    postStore.update(store => {
        store.liked = liked;
        store.total_likes += liked ? 1 : -1;
        return store;
    });

    try {
        const csrfToken = await fetchCsrfToken();
        const response = await fetch(`http://localhost:8000/detail/toggle-like/${post.id}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to toggle like');
        }

        const data = await response.json();
        liked = data.liked;
        postStore.update(store => {
            store.total_likes = data.total_likes;
            store.liked = liked;
            return store;
        });

    } catch (error) {
        liked = !liked;
        postStore.update(store => {
            store.liked = liked;
            store.total_likes += liked ? 1 : -1;
            return store;
        });
        alert('Something went wrong. Please try again.');
    }
  }

  function toggleComments() {
    showComments = !showComments;
  }

  function toggleShareOptions() {
    showShareOptions = !showShareOptions;
  }

  function closeShareOptions(event) {
    if (!event.target.closest('.share-options') && !event.target.closest('.bi-share-fill')) {
      showShareOptions = false;
    }
  }

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

  onMount(() => {
    if (typeof document !== 'undefined') {
      document.addEventListener('click', closeShareOptions);
    }
  });

  onDestroy(() => {
    unsubscribe();
    if (typeof document !== 'undefined') {
      document.removeEventListener('click', closeShareOptions);
    }
  });
</script>

<div class="post-icons">
  <div class="post-icons-left">
      <span>
        <i 
        class={liked ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"}
        on:click={handleLike} 
      ></i> {post.total_likes}
      </span>
      <span>
        <i class="bi bi-chat-right-fill" on:click={toggleComments}></i> {totalComments}
      </span>
  </div>
  <div class="post-icons-right">
      <i class="bi bi-share-fill" on:click={toggleShareOptions}></i>
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
  </div>

  {#if showComments}
    <CommentSection on:close={toggleComments} />
  {/if}

  {#if linkCopied}
    <div class="copy-notification">Link copied to clipboard!</div>
  {/if}
</div>

<style>
  .post-icons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.9em;
    color: #777;
    position: relative;
  }

  .post-icons-left {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .post-icons-left span {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .post-icons i {
    font-size: 1.5em;
    cursor: pointer;
  }

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
    bottom: 10px;
    right: 10px;
    background-color: #4caf50;
    color: white;
    padding: 10px;
    border-radius: 5px;
    z-index: 20;
  }
</style>
