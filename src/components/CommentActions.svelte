<script>
    export let showReplies = false;
    export let repliesCount = 0;
    export let replying = false;
    export let toggleReplies;
    export let toggleReply;
  </script>
  
  <div class="comment-actions">
    <span class="comment-reply" on:click={toggleReplies}>
      {#if showReplies}
        Hide Replies
      {:else}
        {repliesCount} Replies
      {/if}
    </span>
    <span class="comment-reply" on:click={toggleReply}>
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
      cursor: pointer;
      color: #242424;
      
      font-size: 14px;
    }
  
    .comment-reply:hover {
      text-decoration: underline;
    }
  </style>
  