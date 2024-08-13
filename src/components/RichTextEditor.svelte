<script>
    import { onMount, afterUpdate } from 'svelte';

    export let newComment = '';
    let isBoldActive = false;
    let isItalicActive = false;

    function formatText(command) {
        document.execCommand(command);
        checkActiveStates();
    }

    function checkActiveStates() {
        const editor = document.querySelector('.editor');
        if (editor) {
            // Ensure this runs when the editor has content
            isBoldActive = document.queryCommandState('bold');
            isItalicActive = document.queryCommandState('italic');
        }
    }

    onMount(() => {
        // Set initial state to inactive
        isBoldActive = false;
        isItalicActive = false;

        // Set up observer to monitor changes in editor
        const editor = document.querySelector('.editor');
        if (editor) {
            const observer = new MutationObserver(() => checkActiveStates());
            observer.observe(editor, { childList: true, subtree: true });
            
            // Initial check to update button states if necessary
            checkActiveStates();

            // Cleanup on component destroy
            return () => observer.disconnect();
        }
    });

    afterUpdate(() => {
        // Ensure active states are updated after each update
        checkActiveStates();
    });
</script>

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

<style>
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
</style>
