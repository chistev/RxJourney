<script>
    let notifications = [
      { id: 1, type: 'comment', username: 'JohnDoe', postTitle: 'Post Title', read: false },
      { id: 2, type: 'comment', username: 'JaneSmith', postTitle: 'Another Post', read: true },
      { id: 3, type: 'response', username: 'AliceBrown', postTitle: 'Yet Another Post', read: false },
      { id: 4, type: 'comment', username: 'BobJohnson', postTitle: 'Some Post', read: true },
      { id: 5, type: 'response', username: 'CarolWhite', postTitle: 'Final Post', read: false },
    ];
    
    function handleShowMore() {
      // Redirect to notifications page or load more notifications
      window.location.href = '/notifications';
    }
  </script>
  
  <div class="dropdown-menu">
    {#each notifications as { id, type, username, postTitle, read }}
      <a class="dropdown-item {read ? 'read' : 'unread'}" href="#">
        {#if type === 'comment'}
          {username} commented on your {postTitle}
        {:else}
          {username} responded to your comment on {postTitle}
        {/if}
      </a>
    {/each}
    <div class="dropdown-item text-center">
      <button class="btn btn-link" on:click={handleShowMore}>Show More</button>
    </div>
  </div>
  
  <style>
    .dropdown-menu {
      max-height: 300px;
      overflow-y: auto;
      border-radius: 5px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  
    .dropdown-item {
      padding: 0.5rem 1rem;
      border-bottom: 1px solid #ddd;
      text-decoration: none;
    }
  
    .dropdown-item:last-child {
      border-bottom: none;
    }
  
    .dropdown-item.unread {
      background-color: #f5f5f5;
      font-weight: bold;
    }
  
    .dropdown-item.read {
      background-color: #fff;
    }
  
    .dropdown-item:hover {
      background-color: #e9ecef;
    }
  
    .btn-link {
      color: #007bff;
      text-decoration: none;
    }
  
    .btn-link:hover {
      color: #0056b3;
      text-decoration: underline;
    }
  </style>
  