<script>
  import { fetchCsrfToken } from '../../utils';

  export let data;
  let { user } = data;

  let showConfirmation = false;
  let loading = false; // Add loading state

  const handleDeleteClick = () => {
    showConfirmation = true;
  };

  const confirmDelete = async () => {
    loading = true; // Start loading
    try {
      const csrfToken = await fetchCsrfToken();

      const response = await fetch('http://localhost:8000/settings/api/delete-account/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({ email: user.email }),
        credentials: 'include',
      });

      if (response.ok) {
        alert('Account deleted successfully.');
        window.location.href = '/';
      } else {
        alert('Failed to delete account.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while deleting your account.');
    } finally {
      loading = false; // Stop loading
    }
  };
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

  .confirmation-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 2rem;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    border-radius: 8px;
    text-align: center;
  }

  .confirmation-dialog button {
    margin: 0.5rem;
    padding: 0.75rem 1.5rem;
    font-size: 14px;
    font-weight: 600;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .confirmation-dialog button.confirm {
    background-color: #ff4d4f;
    color: white;
  }

  .confirmation-dialog button.confirm:hover {
    background-color: #ff1a1a;
  }

  .confirmation-dialog button.cancel {
    background-color: #d9d9d9;
    color: #333;
  }

  .confirmation-dialog button.cancel:hover {
    background-color: #bfbfbf;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }

  .loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 5px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: #333;
    animation: spin 1s ease infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>

<div class="settings-container">
  <h1 class="settings-header">Settings</h1>
  <div class="settings-tabs">
    <div class="settings-tab active">Account</div>
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
      <span>Username</span>
      <strong>@{user.username}</strong>
    </div>
    <div class="danger-action" on:click={handleDeleteClick}>
      Delete account
      <span>Permanently delete your account and all of your content.</span>
    </div>
  </div>
</div>

{#if showConfirmation}
  <div class="overlay"></div>
  <div class="confirmation-dialog">
    <p>Are you sure you want to delete your account? This action cannot be undone.</p>
    <button class="confirm" on:click={confirmDelete}>Yes, delete</button>
    <button class="cancel" on:click={() => (showConfirmation = false)}>Cancel</button>
  </div>
{/if}

{#if loading}
  <div class="loading-spinner">
    <div class="spinner"></div>
  </div>
{/if}