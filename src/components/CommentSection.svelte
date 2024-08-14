<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import { postStore } from '../stores/postStore';
    import RichTextEditor from './RichTextEditor.svelte';
    import CommentDropdown from './CommentDropdown.svelte';
    import Comments from './Comments.svelte';
    import SubmitCommentButton from './SubmitCommentButton.svelte';
    import { fetchCsrfToken } from '../utils';
    import { userStore } from '../stores/userStore';
    
    let post;
    let comments = [];
    let newComment = '';
    let currentUsername = ''; 
    let loading = false;
    let sortOrder = 'oldest';  // Default sort order
    const dispatch = createEventDispatcher();
    
    const unsubscribe = postStore.subscribe(value => {
      post = value;
      fetchComments();
    });
    
    const unsubscribeUser = userStore.subscribe(user => {
      currentUsername = user.username;
    });
    
    async function fetchComments() {
      loading = true;
      try {
        const response = await fetch(`http://localhost:8000/detail/comments/${post.id}/?order=${sortOrder}`);
        const result = await response.json();
        comments = result.comments;
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        loading = false;
      }
    }
  
    async function handleEditComment({ commentId, newContent }) {
      try {
        const csrfToken = await fetchCsrfToken();
        const response = await fetch(`http://localhost:8000/detail/edit-comment/${commentId}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
          credentials: 'include',
          body: JSON.stringify({ content: newContent }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to update comment');
        }
  
        const result = await response.json();
  
        if (result.status === 'success') {
          comments = comments.map(comment =>
            comment.id === commentId
              ? { ...comment, text: newContent }
              : comment
          );
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        console.error('Error updating comment:', error);
        alert('Failed to update comment. Please try again.');
      }
    }
  
    function handleEdit(event) {
      const { commentId, newContent } = event.detail;
      handleEditComment({ commentId, newContent });
    }
  
    async function handleCommentSubmit() {
      const commentContent = newComment;
      const tempCommentId = Date.now();
  
      const newCommentObj = {
        id: tempCommentId,
        username: currentUsername,
        avatar: 'bi-person',
        time: 'Just now',
        text: commentContent,
        replies: [],
        isTemp: true
      };
  
      comments = [newCommentObj, ...comments];
      newComment = '';
  
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
            content: commentContent,
            parentId: null
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to submit comment');
        }
  
        const result = await response.json();
  
        if (result.status === 'success') {
          comments = comments.map(comment =>
            comment.id === tempCommentId
              ? { ...comment, id: result.commentId, isTemp: false }
              : comment
          );
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        console.error('Error submitting comment:', error);
        comments = comments.filter(comment => comment.id !== tempCommentId);
        alert('Failed to submit comment. Please try again.');
      }
    }
  
    function handleSortChange(event) {
      sortOrder = event.detail.sortOrder;
      fetchComments();
    }
  
    function handleDelete(event) {
      const { commentId } = event.detail;
      comments = comments.filter(comment => comment.id !== commentId);
    }
  
    onMount(() => {
      return () => {
        unsubscribe();
        unsubscribeUser(); 
      };
    });
  </script>
  
  <div class="comment-section">
    <div class="comment-header">
      <h2>Responses ({comments.length})</h2>
      <button class="close-button" on:click={() => dispatch('close')}>
        <span class="fs-1">&times;</span>
      </button>
    </div>
  
    <RichTextEditor bind:newComment={newComment} />
    <SubmitCommentButton onSubmit={handleCommentSubmit} isDisabled={!newComment.trim()} />
    <CommentDropdown on:sortChange={handleSortChange} />
  
    {#if loading}
      <div class="loading-indicator">Loading...</div>
    {:else}
      {#each comments as comment (comment.id)}
        <Comments
          username={comment.username}
          avatar={comment.avatar}
          time={comment.time}
          text={comment.text}
          replies={comment.replies}
          commentId={comment.id} 
          post={post}  
          on:edit={handleEdit}
          on:delete={handleDelete}
        />
      {/each}
    {/if}
  </div>
    
<style>
.loading-indicator {
    font-size: 16px;
    text-align: center;
    margin-top: 20px;
  }
  
  .comment-section {
    position: fixed;
    right: 0;
    top: 0;
    width: 350px;
    height: 100%;
    background-color: #f9f9f9;
    box-shadow: -3px 0px 15px rgba(0, 0, 0, 0.1);
    padding: 20px;
    display: flex;
    flex-direction: column;
    z-index: 1000;
    overflow-y: auto;
  }

  .comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .comment-header h2 {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #242424;
  }

  .close-button {
    background-color: #f9f9f9;
    border: 2px solid #e0e0e0;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .close-button:hover {
    background-color: #e74c3c;
    border-color: #e74c3c;
    color: #fff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  .close-button span {
    font-size: 20px;
    line-height: 20px;
    font-weight: bold;
  }
</style>
