<script>
  import RichTextEditor from '../components/RichTextEditor.svelte';
  import SubmitCommentButton from './SubmitCommentButton.svelte';
  import { userStore } from '../stores/userStore';
  import Comments from '../components/Comments.svelte'
  import { fetchCsrfToken } from '../utils';

  export let username;
  export let avatar;
  export let time;
  export let text;
  export let replies = [];
  export let commentId;  
  export let post;  

  let showReplies = false;
  let replying = false;
  let replyText = '';

  let currentUser = {};
  userStore.subscribe(user => {
      currentUser = user;
  });

  function toggleReplies() {
    showReplies = !showReplies;
  }

  function toggleReply() {
    replying = !replying;
  }

  async function submitReply() {
    if (replyText.trim()) {
      const tempReplyId = Date.now();

      const newReply = {
        id: tempReplyId,
        username: currentUser.username,
        avatar: 'bi-person',
        time: 'Just now',
        text: replyText,
        replies: [],
        isTemp: true
      };

      replies = [...replies, newReply];
      replyText = '';
      replying = false;

      try {
        const csrfToken = await fetchCsrfToken();
        const response = await fetch('http://localhost:8000/detail/add-comment/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
          credentials: 'include',
          body: JSON.stringify({
            postId: post.id,
            content: newReply.text,
            parentId: commentId,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to submit reply');
        }

        const result = await response.json();

        if (result.status === 'success') {
          replies = replies.map(reply =>
            reply.id === tempReplyId
              ? { ...reply, id: result.commentId, isTemp: false }
              : reply
          );
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        console.error('Error submitting reply:', error);
        replies = replies.filter(reply => reply.id !== tempReplyId);
        alert('Failed to submit reply. Please try again.');
      }
    }
  }
</script>

<div class="comment">
  <div class="comment-user">
    <i class={`comment-avatar ${avatar}`}></i>

    <span class="comment-username">{username}</span>
    <span class="comment-time">{time}</span>
  </div>
  <p class="comment-text">{text}</p>
  <div class="comment-actions">
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
      <RichTextEditor bind:newComment={replyText} />
      <SubmitCommentButton onSubmit={submitReply} isDisabled={!replyText.trim()} />
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
          replies={reply.replies}
          commentId={reply.id}
          post={post}
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
    font-size: 2em; /* Increase icon size */
    width: 40px; /* Width of the avatar */
    height: 40px; /* Height of the avatar */
    border-radius: 50%; /* Make it circular */
    background-color: #f0f0f0; /* Background color for better visibility */
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333; /* Icon color */
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

  .replies {
    margin-left: 20px;
    padding-left: 10px;
    border-left: 1px solid #e0e0e0;
  }
</style>
