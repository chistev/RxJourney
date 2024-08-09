<script>
  import AccountSettings from '../../components/AccountSettings.svelte';
  import { fetchCsrfToken } from '../../utils';

  export let data;
  let { user } = data;

  let showConfirmation = false;
  let loading = false;

  const handleDeleteClick = () => {
    showConfirmation = true;
  };

  const confirmDelete = async () => {
    loading = true;
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
      loading = false;
    }
  };
</script>

<style>
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

<AccountSettings {user} {handleDeleteClick} />

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