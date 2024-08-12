<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import { postStore } from '../stores/postStore';

    let post;
    const unsubscribe = postStore.subscribe(value => {
        post = value;
    });

    let newComment = '';
    let isBoldActive = false;
    let isItalicActive = false;

    const dispatch = createEventDispatcher();  // Create the event dispatcher

    function handleCommentSubmit() {
        // Handle comment submission (e.g., send to the server)
        console.log('New comment:', newComment);
        // Clear the input field after submission
        newComment = '';
    }

    function formatText(command) {
        document.execCommand(command);
        checkActiveStates();
    }

    function checkActiveStates() {
        isBoldActive = document.queryCommandState('bold');
        isItalicActive = document.queryCommandState('italic');
    }

    onMount(() => {
        checkActiveStates();
        return () => {
            unsubscribe();
        };
    });
</script>

<div class="comment-section">
    <div class="comment-header">
        <h2>Responses ({post.comments})</h2>
        <button class="close-button" on:click={() => dispatch('close')}>
            <span class="fs-1">&times;</span>
        </button>
    </div>

    <div class="rich-text-editor">
        <div class="toolbar">
            <button 
                class:active={isBoldActive} 
                class="format-button" 
                on:click={() => formatText('bold')}
            >
                <b>B</b>
            </button>
            <button 
                class:active={isItalicActive} 
                class="format-button" 
                on:click={() => formatText('italic')}
            >
                <i>I</i>
            </button>
        </div>
        <div 
            class="editor" 
            contenteditable="true" 
            bind:innerHTML={newComment}
            on:input={(e) => newComment = e.target.innerHTML}
            placeholder="What are your thoughts?"
        ></div>
    </div>

    <button 
        class="submit-comment" 
        on:click={handleCommentSubmit} 
        disabled={!newComment.trim()} 
    >
        Respond
    </button>
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

  .rich-text-editor {
      width: 100%;
  }

  .toolbar {
      margin-bottom: 10px;
      display: flex;
      gap: 5px;
  }

  .format-button {
      background-color: #f9f9f9;
      border: 2px solid #e0e0e0;
      border-radius: 4px;
      padding: 5px;
      cursor: pointer;
      font-size: 14px;
      font-family: Arial, sans-serif;
  }

  .format-button:hover {
      background-color: #242424;
      color: #fff;
  }

  .format-button.active {
      background-color: #242424;
      color: #fff;
  }

  .editor {
      width: 100%;
      height: 80px;
      margin-bottom: 10px;
      padding: 10px;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      font-family: Arial, sans-serif;
      overflow-y: auto;
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
