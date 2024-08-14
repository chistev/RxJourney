<script>
  import { userStore } from '../stores/userStore';
  import RichTextEditor from '../components/RichTextEditor.svelte';
  import SubmitCommentButton from './SubmitCommentButton.svelte';
  import { fetchCsrfToken } from '../utils';
  import Comments from '../components/Comments.svelte';
  import { onMount, onDestroy } from "svelte";
	import CommentOptionsMenu from './CommentOptionsMenu.svelte';

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
  let showOptions = false;
  let currentUser = {};

  userStore.subscribe(user => {
    currentUser = user;
  });

  // Function to handle delete action
  async function deleteComment() {
    try {
      const csrfToken = await fetchCsrfToken();
      const response = await fetch(`http://localhost:8000/detail/delete-comment/${commentId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }

      // Remove comment from local list or handle as needed
      // You might need to trigger a re-fetch or update parent component
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment. Please try again.');
    }
  }

  // Function to handle edit action
  function editComment() {
    // Implement edit functionality here
    // This might involve showing a form or modal to edit the comment
  }

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

  // Determine if the current user is the author of the comment
  const isOwner = currentUser.username === username;

  // Close the options menu when clicking outside
  function handleClickOutside(event) {
    if (!event.target.closest('.comment-options')) {
      showOptions = false;
    }
  }

  // Add event listener when component is mounted
  function addClickListener() {
    document.addEventListener('click', handleClickOutside);
  }

  // Remove event listener when component is destroyed
  function removeClickListener() {
    document.removeEventListener('click', handleClickOutside);
  }

  // Call addClickListener when the component is mounted
  onMount(addClickListener);

  // Call removeClickListener when the component is destroyed
  onDestroy(removeClickListener);
</script>

<div class="comment">
  <div class="comment-user">
    <i class={`comment-avatar ${avatar}`}></i>

    <span class="comment-username">{username}</span>
    <span class="comment-time">{time}</span>
    {#if isOwner}
      <div class="comment-options" on:click={() => showOptions = !showOptions}>
        <i class="bi bi-three-dots"></i>
        {#if showOptions}
        <CommentOptionsMenu onEdit={editComment} onDelete={deleteComment} />
        {/if}
      </div>
    {/if}
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
    position: relative; /* Needed for options menu positioning */
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
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #242424;
    line-height: 20px;
    margin-right: 10px;
  }

  .comment-time {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #6b6b6b;
    line-height: 20px;
  }

  .comment-text {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #242424;
    line-height: 24px;
    margin-bottom: 10px;
    line-height: 24px;
  }

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

  .comment-options {
    cursor: pointer;
    color: #777;
    font-size: 1.2em;
    margin-left: auto;
  }

  .options-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    padding: 5px 0;
    z-index: 10;
  }
</style>
