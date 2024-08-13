<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import { postStore } from '../stores/postStore';
    import RichTextEditor from './RichTextEditor.svelte';
    import CommentDropdown from './CommentDropdown.svelte';
    import Comments from './Comments.svelte';

    let post;
    const unsubscribe = postStore.subscribe(value => {
        post = value;
    });

    let newComment = '';

    const dispatch = createEventDispatcher();

    function handleCommentSubmit() {
        console.log('New comment:', newComment);
        newComment = '';
    }

    // Dummy data for comments
    let comments = [
        {
            id: 1,
            username: 'Jane Doe',
            avatar: 'https://via.placeholder.com/30',
            time: '2 hours ago',
            text: 'This is the first comment.',
            likes: 3,
            replies: [
                {
                    id: 2,
                    username: 'John Smith',
                    avatar: 'https://via.placeholder.com/30',
                    time: '1 hour ago',
                    text: 'This is a reply to the first comment.',
                    likes: 2,
                    replies: [
                        {
                            id: 3,
                            username: 'Anna Taylor',
                            avatar: 'https://via.placeholder.com/30',
                            time: '30 minutes ago',
                            text: 'This is a reply to the reply.',
                            likes: 1,
                            replies: []
                        }
                    ]
                }
            ]
        },
        {
            id: 4,
            username: 'Michael Brown',
            avatar: 'https://via.placeholder.com/30',
            time: '3 hours ago',
            text: 'This is another comment.',
            likes: 1,
            replies: []
        }
    ];

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

    <button 
        class="submit-comment" 
        on:click={handleCommentSubmit} 
        disabled={!newComment.trim()} 
    >
        Respond
    </button>

    <CommentDropdown/>

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

  .submit-comment {
    align-self: flex-end;
    padding: 10px 20px;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #242424;
    background-color: #f9f9f9;
    border: 2px solid #242424;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
  }

  .submit-comment:hover {
    background-color: #242424;
    color: #fff;
  }

  .submit-comment:disabled {
    background-color: #e0e0e0;
    color: #a0a0a0;
    cursor: not-allowed;
  }
</style>
