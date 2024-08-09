<script>
    export let user;
    export let handleDeleteClick;
  </script>
  
  <div>
    <span>Email address</span>
    <strong>{user.email}</strong>
  </div>
  <div>
    <span>Username</span>
    <strong>@{user.username}</strong>
  </div>
  <div class="danger-action" on:click={handleDeleteClick}>
    Delete account
    <span>Permanently delete your account and all of your content.</span>
  </div>
  
  
  <style>
    .settings-section div span {
      font-family: 'Helvetica Neue', sans-serif;
      font-weight: 400;
      display: block;
      font-size: 14px;
      line-height: 20px;
      color: #242424;
      margin-bottom: 0.5rem;
    }
  
    .settings-section div strong {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 14px;
      font-weight: 400;
      color: #000000;
    }
  
    .danger-action {
      color: red;
      font-weight: bold;
      cursor: pointer;
      margin-top: 2rem;
    }
  
    .danger-action span {
      display: block;
      font-size: 0.875rem;
      color: #888;
      margin-bottom: 1rem;
    }
  </style>
  