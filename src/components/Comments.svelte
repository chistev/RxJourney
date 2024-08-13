<script>
    export let username;
    export let avatar;
    export let time;
    export let text;
    export let likes;
</script>

<div class="comment">
    <div class="comment-user">
        <img src=avatar alt="user-avatar" class="comment-avatar">
        <span class="comment-username">username</span>
        <span class="comment-time">time</span>
    </div>
    <p class="comment-text">text</p>
    <div class="comment-actions">
        <i class="bi bi-hand-thumbs-up"></i> likes
        <span class="comment-reply">Reply</span>
    </div>
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
</style>
