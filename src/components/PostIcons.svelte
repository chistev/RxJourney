<script>
  import { postStore } from '../stores/postStore';
  import { fetchCsrfToken } from '../utils';
  import { onDestroy, createEventDispatcher, onMount } from 'svelte';
  import CommentSection from '../components/CommentSection.svelte';
  import ShareOptions from '../components/ShareOptions.svelte';

  let post;
  let liked = false;
  let showComments = false;
  let totalComments = 0;
  let showShareOptions = false;

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

  function toggleShareOptions(state) {
    showShareOptions = state;
  }

  onDestroy(() => {
    unsubscribe();
  });
</script>

<div class="post-icons">
  <div class="post-icons-left">
    <span>
      <i class={liked ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"} on:click={handleLike}></i> {post.total_likes}
    </span>
    <span>
      <i class="bi bi-chat-right-fill" on:click={toggleComments}></i> {totalComments}
    </span>
  </div>

  <ShareOptions {showShareOptions} {toggleShareOptions} />

  {#if showComments}
    <CommentSection on:close={toggleComments} />
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
</style>
