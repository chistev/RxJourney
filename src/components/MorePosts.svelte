<style>
    .more-posts-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      max-width: 800px;
      margin: 0 auto;
      background-color: #f9f9f9;
    }
  
    .post-card {
      background-color: #f9f9f9;
      border-radius: 8px;
      padding: 10px;
      max-width: 300px;
      margin: 0 auto;
    }
  
    .post-card img {
      width: 100%;
      border-radius: 8px;
      height: 150px;
      object-fit: cover;
    }
  
    .post-card-title {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 16px;
      font-weight: 700;
      color: #242424;
      margin: 10px 0;
    }
  
    .post-card-meta {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-weight: 400;
      line-height: 18px;
      font-size: 12px;
      color: #6b6b6b;
      margin-bottom: 10px;
    }
  
    .post-card-content {
      font-family: Georgia, Cambria, 'Times New Roman', Times, serif;
      font-weight: 400;
      font-size: 14px;
      color: #242424;
      line-height: 22px;
    }
  
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
  
    /* Media query for smaller screens */
    @media (max-width: 600px) {
      .more-posts-container {
        grid-template-columns: 1fr; /* Stack cards vertically */
      }
  
      .post-card {
        max-width: 100%; /* Ensure cards take full width on smaller screens */
        margin-bottom: 20px; /* Add space between cards */
      }
    }
  </style>


<div class="more-posts-container">
    <div class="post-card">
        <img src="https://via.placeholder.com/300x200" alt="Placeholder Title 1" />
        <div class="post-card-title">Placeholder Title 1</div>
        <div class="post-card-meta">August 11, 2024</div>
        <div class="post-card-content">This is a brief excerpt of the placeholder post content. It gives an idea of what the actual post might say.</div>
        <div class="post-icons">
            <div class="post-icons-left">
              <span><i class="bi bi-hand-thumbs-up-fill"></i> 0</span>
              <span><i class="bi bi-chat-right-fill"></i> 0</span>
            </div>
            <div class="post-icons-right">
                <i class="bi bi-share-fill"></i>
              </div>
    </div>
    </div>
    
    <div class="post-card">
        <img src="https://via.placeholder.com/300x200" alt="Placeholder Title 1" />
        <div class="post-card-title">Placeholder Title 1</div>
        <div class="post-card-meta">August 11, 2024</div>
        <div class="post-card-content">This is a brief excerpt of the placeholder post content. It gives an idea of what the actual post might say.</div>
        <div class="post-icons">
            <div class="post-icons-left">
              <span><i class="bi bi-hand-thumbs-up-fill"></i> 0</span>
              <span><i class="bi bi-chat-right-fill"></i> 0</span>
            </div>
            <div class="post-icons-right">
                <i class="bi bi-share-fill"></i>
              </div>
    </div>
    </div>

    <div class="post-card">
        <img src="https://via.placeholder.com/300x200" alt="Placeholder Title 1" />
        <div class="post-card-title">Placeholder Title 1</div>
        <div class="post-card-meta">August 11, 2024</div>
        <div class="post-card-content">This is a brief excerpt of the placeholder post content. It gives an idea of what the actual post might say.</div>
        <div class="post-icons">
            <div class="post-icons-left">
              <span><i class="bi bi-hand-thumbs-up-fill"></i> 0</span>
              <span><i class="bi bi-chat-right-fill"></i> 0</span>
            </div>
            <div class="post-icons-right">
                <i class="bi bi-share-fill"></i>
              </div>
    </div>
    </div>

    <div class="post-card">
        <img src="https://via.placeholder.com/300x200" alt="Placeholder Title 1" />
        <div class="post-card-title">Placeholder Title 1</div>
        <div class="post-card-meta">August 11, 2024</div>
        <div class="post-card-content">This is a brief excerpt of the placeholder post content. It gives an idea of what the actual post might say.</div>
        <div class="post-icons">
            <div class="post-icons-left">
              <span><i class="bi bi-hand-thumbs-up-fill"></i> 0</span>
              <span><i class="bi bi-chat-right-fill"></i> 0</span>
            </div>
            <div class="post-icons-right">
                <i class="bi bi-share-fill"></i>
              </div>
    </div>
    </div>
</div>