<script>
    export let likes;
    export let comments;
  </script>
  
  <style>
    .post-icons {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.9em;
      color: #777;
    }
  
    .post-icons-left {
      display: flex;
      align-items: center;
      gap: 15px;
    }
  
    .post-icons-left span {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  
    .post-icons i {
      font-size: 1.5em; /* Uniform size for all icons */
    }
  </style>
  
  <div class="post-icons">
    <div class="post-icons-left">
      <span><i class="bi bi-hand-thumbs-up-fill"></i> {likes}</span>
      <span><i class="bi bi-chat-right-fill"></i> {comments}</span>
    </div>
    <div class="post-icons-right">
      <i class="bi bi-share-fill"></i>
    </div>
  </div>
  