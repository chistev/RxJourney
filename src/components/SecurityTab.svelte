<script>
    import { fetchCsrfToken } from '../utils';
    import { onMount } from 'svelte';
  
    let currentPassword = '';
    let newPassword = '';
    let confirmPassword = '';
  
    let isLoading = false;
    let notificationMessage = '';
    let notificationType = ''; // "success" or "error"
    let errorMessages = []; // Array to hold validation error messages
  
    async function handleSignOut() {
      try {
        isLoading = true;
        notificationMessage = '';
        const csrfToken = await fetchCsrfToken();
        const response = await fetch('http://localhost:8000/settings/sign-out-sessions/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
          credentials: 'include',
        });
  
        if (!response.ok) {
          throw new Error('Failed to sign out of sessions');
        }
  
        const data = await response.json();
        console.log('Sign out successful:', data);
  
        // Show success notification
        notificationType = 'success';
        notificationMessage = 'Signed out of all other sessions successfully.';
      } catch (error) {
        console.error('Error signing out of sessions:', error);
  
        // Show error notification
        notificationType = 'error';
        notificationMessage = 'An error occurred while signing out of sessions. Please try again.';
      } finally {
        isLoading = false;
      }
    }
  
    async function handleChangePassword() {
      // Reset error messages
      errorMessages = [];
  
      if (newPassword !== confirmPassword) {
        notificationType = 'error';
        notificationMessage = "Passwords do not match!";
        return;
      }
  
      if (newPassword.length < 8) {
        notificationType = 'error';
        notificationMessage = "New password must be at least 8 characters long.";
        return;
      }
  
      try {
        isLoading = true;
        notificationMessage = '';
        const csrfToken = await fetchCsrfToken();
        const response = await fetch('http://localhost:8000/settings/change-password/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
          credentials: 'include',
          body: JSON.stringify({
            current_password: currentPassword,
            new_password: newPassword,
          }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          if (errorData.errors) {
            // Show validation errors from the server
            errorMessages = errorData.errors;
          } else {
            throw new Error('Failed to change password');
          }
          return;
        }
  
        const data = await response.json();
        console.log('Password change successful:', data);
  
        // Show success notification
        notificationType = 'success';
        notificationMessage = 'Password changed successfully.';
      } catch (error) {
        console.error('Error changing password:', error);
  
        // Show error notification
        notificationType = 'error';
        notificationMessage = 'An error occurred while changing the password. Please try again.';
      } finally {
        isLoading = false;
      }
    }
  
    // Optional: Clear notifications after a timeout
    onMount(() => {
      if (notificationMessage) {
        setTimeout(() => {
          notificationMessage = '';
        }, 5000); // Clear message after 5 seconds
      }
    });
</script>

<!-- Loading state -->
{#if isLoading}
  <div class="loading">Processing...</div>
{/if}

<!-- Notification message -->
{#if notificationMessage}
  <div class="notification {notificationType}">
    {notificationMessage}
  </div>
{/if}

<!-- Error messages (if any) -->
{#if errorMessages.length > 0}
  <ul>
    {#each errorMessages as error}
      <li class="error-message">{error}</li>
    {/each}
  </ul>
{/if}

<!-- Sign out of all sessions -->
<div class="security-option" on:click={handleSignOut}>
  Sign out of all other sessions
  <span>Sign out of sessions in other browsers or on other computers.</span>
</div>

<div class="security-change-password">
  <h2>Change your password</h2>
  <label>
    <span>Current password</span>
    <input type="password" bind:value={currentPassword} placeholder="Enter your current password">
  </label>
  <label>
    <span>New password</span>
    <input type="password" bind:value={newPassword} placeholder="Enter your new password">
  </label>
  <label>
    <span>Confirm new password</span>
    <input type="password" bind:value={confirmPassword} placeholder="Confirm your new password">
  </label>
  <button on:click={handleChangePassword} disabled={isLoading}>Change password</button>
</div>

<style>
  .security-option {
    color: red;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 2rem;
  }

  .security-option span {
    display: block;
    font-size: 0.875rem;
    color: #888;
    margin-bottom: 1rem;
  }

  .security-change-password h2 {
    font-size: 24px;
    color: #242424;
    margin-bottom: 1rem;
    font-family: 'Helvetica Neue', sans-serif;
  }

  .security-change-password label {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;
    font-family: 'Helvetica Neue', sans-serif;
  }

  .security-change-password label span {
    margin-bottom: 0.5rem;
    font-size: 14px;
    color: #242424;
  }

  .security-change-password input {
    padding: 0.5rem;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
    max-width: 300px;
  }

  .security-change-password button {
    padding: 0.75rem 1.5rem;
    font-size: 16px;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Helvetica Neue', sans-serif;
  }

  .loading {
    font-size: 16px;
    color: #007bff;
    margin-bottom: 1rem;
  }

  .notification {
    padding: 0.75rem 1.5rem;
    font-size: 16px;
    border-radius: 4px;
    margin-bottom: 1rem;
    font-family: 'Helvetica Neue', sans-serif;
  }

  .notification.success {
    color: #28a745;
    background-color: #d4edda;
    border: 1px solid #c3e6cb;
  }

  .notification.error {
    color: #dc3545;
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
  }

  .error-message {
    color: #dc3545;
    font-size: 14px;
    font-family: 'Helvetica Neue', sans-serif;
    margin-bottom: 0.5rem;
  }
</style>
