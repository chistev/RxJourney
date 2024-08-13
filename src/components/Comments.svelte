<script>
  import Comments from '../components/Comments.svelte';
  
  export let username;
  export let avatar;
  export let time;
  export let text;
  export let likes;
  export let replies = [];

  let showReplies = false;
  let replying = false; // New state to track if the reply input should be shown
  let replyText = ''; // New state to hold the reply text

  function toggleReplies() {
      showReplies = !showReplies;
  }

  function toggleReply() {
      replying = !replying;
  }

  function submitReply() {
      if (replyText.trim()) {
          replies = [
              ...replies, 
              {
                  id: replies.length + 1,
                  username: 'Current User', // You can replace this with the actual current user
                  avatar: 'https://via.placeholder.com/30', // Replace with actual avatar URL
                  time: 'Just now',
                  text: replyText,
                  likes: 0,
                  replies: []
              }
          ];
          replyText = '';
          replying = false;
      }
  }
</script>

<div class="comment">
  <div class="comment-user">
      <img src={avatar} alt="user-avatar" class="comment-avatar">
      <span class="comment-username">{username}</span>
      <span class="comment-time">{time}</span>
  </div>
  <p class="comment-text">{text}</p>
  <div class="comment-actions">
      <i class="bi bi-hand-thumbs-up"></i> {likes}
      <span class="comment-reply" on:click={toggleReplies}>
          {#if showReplies} 
              Hide Replies 
          {:else} 
              {replies.length} Replies 
          {/if}
      </span>
      <span class="comment-reply" on:click={toggleReply}>
          Reply
      </span>
  </div>

  {#if replying}
    <div class="reply-input">
        <textarea bind:value={replyText} placeholder="Write a reply..."></textarea>
        <button on:click={submitReply} disabled={!replyText.trim()}>Submit Reply</button>
    </div>
  {/if}

  {#if showReplies && replies.length > 0}
  <div class="replies">
      {#each replies as reply (reply.id)}
          <Comments
              username={reply.username}
              avatar={reply.avatar}
              time={reply.time}
              text={reply.text}
              likes={reply.likes}
              replies={reply.replies}
          />
      {/each}
  </div>
  {/if}
</div>

<style>
.comment {
  display: flex;
  flex-direction: column;
  padding: 15px 0;
  border-bottom: 1px solid #e0e0e0;
}

.comment-user {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.comment-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.comment-username {
  font-weight: 600;
  font-size: 0.95em;
  color: #242424;
  margin-right: 10px;
}

.comment-time {
  font-size: 0.85em;
  color: #777;
}

.comment-text {
  font-size: 0.9em;
  color: #333;
  margin-bottom: 10px;
  line-height: 1.4;
}

.comment-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85em;
  color: #777;
}

.comment-actions i {
  font-size: 1.2em;
  cursor: pointer;
  color: #777;
}

.comment-reply {
  cursor: pointer;
  color: #007BFF;
  font-weight: 500;
}

.comment-reply:hover {
  text-decoration: underline;
}

.reply-input {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.reply-input textarea {
  resize: none;
  width: 100%;
  height: 50px;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.reply-input button {
  align-self: flex-end;
  padding: 5px 10px;
  font-size: 0.85em;
  font-weight: 500;
  color: #fff;
  background-color: #007BFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.reply-input button:disabled {
  background-color: #ccc;
}

.replies {
  margin-left: 20px;
  padding-left: 10px;
  border-left: 1px solid #e0e0e0;
}
</style>
