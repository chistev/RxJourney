<script>
    import { onMount } from 'svelte';
  
    export let data; // Import the data prop
    let { user } = data; // Destructure the data prop
  
    let modal;
  
    function openModal() {
      const modalElement = new bootstrap.Modal(modal);
      modalElement.show();
    }
  </script>
  
  <style>
    .settings-container {
      padding: 2rem;
      font-family: 'medium-content-sans-serif-font', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      max-width: 800px;
      margin: auto;
    }
  
    .settings-header {
      font-size: 42px;
      line-height: 52px;
      color: #242424;
      margin-bottom: 2rem;
      font-family: 'Helvetica Neue', sans-serif;
      font-weight: 500;
    }
  
    .settings-tabs {
      display: flex;
      border-bottom: 1px solid #ddd;
      margin-bottom: 2rem;
      gap: 1.5rem;
    }
  
    .settings-tab {
      font-family: 'Helvetica Neue', sans-serif;
      padding-bottom: 0.5rem;
      cursor: pointer;
      color: #000000;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
    }
  
    .settings-tab.active {
      border-bottom: 2px solid #191919;
    }
  
    .settings-section {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
  
    .settings-section div {
      margin-bottom: 1rem;
    }
  
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
  
    .settings-section .icon {
      font-size: 1.5rem;
      margin-left: 0.5rem;
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
  
    .modal-content {
      padding: 2rem;
      font-family: 'medium-content-sans-serif-font', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
  
    .modal-header {
      border-bottom: none;
    }
  
    .modal-body {
      text-align: center;
    }
  
    .modal-footer {
      border-top: none;
      justify-content: center;
    }
  </style>
  
  <div class="settings-container">
    <h1 class="settings-header">Settings</h1>
    <div class="settings-tabs">
      <div class="settings-tab active">Account</div>
      <div class="settings-tab">Publishing</div>
      <div class="settings-tab">Notifications</div>
      <div class="settings-tab">Membership and payment</div>
      <div class="settings-tab">Security and apps</div>
    </div>
    <div class="settings-section">
      <div>
        <span>Email address</span>
        <strong>{user.email}</strong>
      </div>
      <div>
        <span>Username and subdomain</span>
        <strong>@{user.username}</strong>
      </div>
      <div>
        <span>Profile picture</span>
        <i class="icon bi bi-person-circle" on:click={openModal}></i>
      </div>
      <div>
        <span>Profile design</span>
        <strong>Customize the appearance of your profile.</strong><i class="icon bi bi-arrow-right"></i>
      </div>
    </div>
    <div class="settings-section">
      <div class="danger-action">
        Deactivate account
        <span>Deactivating will suspend your account until you sign back in.</span>
      </div>
      <div class="danger-action">
        Delete account
        <span>Permanently delete your account and all of your content.</span>
      </div>
    </div>
  </div>
  
  <div class="modal fade" id="profileModal" tabindex="-1" aria-labelledby="profileModalLabel" aria-hidden="true" bind:this={modal}>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="profileModalLabel">Profile information</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <img src="https://via.placeholder.com/250" alt="Profile Image" class="img-fluid rounded-circle mb-3">
          <div>
            <a href="#" class="btn btn-link text-decoration-none" style="color: #1a8917;">Update</a>
            <a href="#" class="btn btn-link text-danger text-decoration-none">Remove</a>
          </div>
          <div class="text-muted mt-2">
            Recommended: Square JPG, PNG, or GIF, at least 250 pixels per side.
          </div>
        </div>
      </div>
    </div>
  </div>
  