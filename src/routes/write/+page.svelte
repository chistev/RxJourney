<script>
  import { onMount } from 'svelte';
  import { fetchCsrfToken } from '../../utils';

  let title = '';
  let editor;
  let imageFile;
  let isSubmitting = false;

  onMount(async () => {
    if (typeof window !== 'undefined') {
      const Quill = (await import('quill')).default;

      editor = new Quill('#editor', {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'code'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'align': [] }],
            ['link', 'image'],
            [{ 'color': [] }, { 'background': [] }],
            ['clean'],
            [{ 'font': [] }],
            [{ 'size': ['small', 'medium', 'large', 'huge'] }],
            ['blockquote', 'code-block'],
            ['formula']
          ]
        }
      });
    }
  });

  async function savePost() {
    if (isSubmitting) return;

    isSubmitting = true;

    try {
      const content = editor.root.innerHTML;
      const csrfToken = await fetchCsrfToken();

      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await fetch('http://localhost:8000/home/posts/', {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        window.location.href = '/';
      } else {
        console.error('Failed to save post:', data);
      }
    } catch (error) {
      console.error('Error saving post:', error);
    } finally {
      isSubmitting = false;
    }
  }
</script>

<style>
  @import 'quill/dist/quill.snow.css'; /* Import Quill's Snow theme */
  
  .write-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  .quill-editor {
    height: 300px;
  }
</style>

<div class="write-page">
  <h1>Create a New Post</h1>
  <input type="text" placeholder="Title" bind:value={title} class="form-control mb-4"/>
  <input type="file" accept="image/*" on:change="{e => imageFile = e.target.files[0]}" class="form-control mb-4"/>
  <div id="editor" class="quill-editor"></div>
  <button class="btn btn-primary mt-4" on:click={savePost} disabled={isSubmitting}>Save Post</button>
</div>
