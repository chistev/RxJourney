<script>
  export let showReplies = false;
  export let replies = [];
  export let onToggleReplies;
  export let onToggleReply;
</script>

<div class="comment-actions">
  <span class="comment-reply" on:click={onToggleReplies}>
    {#if showReplies}
      Hide Replies
    {:else}
      {replies.length} Replies
    {/if}
  </span>
  <span class="comment-reply" on:click={onToggleReply}>
    Reply
  </span>
</div>

<style>
  .comment-actions {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.85em;
    color: #777;
  }

  .comment-reply {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #242424;
    line-height: 24px;
    margin-bottom: 10px;
    line-height: 20px;
    cursor: pointer;
  }

  .comment-reply:hover {
    text-decoration: underline;
  }
</style>
