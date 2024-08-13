<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import { postStore } from '../stores/postStore';
    import RichTextEditor from './RichTextEditor.svelte';
    import CommentDropdown from './CommentDropdown.svelte';
    import Comments from './Comments.svelte';
    import SubmitCommentButton from './SubmitCommentButton.svelte';
    import { fetchCsrfToken } from '../utils';

    let post;
    let comments = [];
    let newComment = '';
    const dispatch = createEventDispatcher();

    const unsubscribe = postStore.subscribe(value => {
        post = value;
        comments = post.comments || [];
    });

    async function handleCommentSubmit() {
        const csrfToken = await fetchCsrfToken();

        const postId = post.id;
        const parentId = null;

        try {
            const response = await fetch('http://localhost:8000/detail/add-comment/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                credentials: 'include',
                body: JSON.stringify({
                    postId: postId,
                    content: newComment,
                    parentId: parentId
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit comment');
            }

            const result = await response.json();

            if (result.status === 'success') {
                newComment = '';
                // Add the new comment to the local comments array
                comments = [
                    {
                        id: result.commentId,
                        username: 'Current User',
                        avatar: 'bi-person',
                        time: 'Just now',
                        text: newComment,
                        likes: 0,
                        replies: []
                    },
                    ...comments,
                ];
            } else {
                console.error('Failed to submit comment:', result.message);
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    }

    onMount(() => {
        return () => {
            unsubscribe();
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
    <CommentDropdown />

    {#each comments as comment (comment.id)}
        <Comments
            username={comment.username}
            avatar={comment.avatar}
            time={comment.time}
            text={comment.text}
            likes={comment.likes}
            replies={comment.replies}
        />
    {/each}
</div>


<style>
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
