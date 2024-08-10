<script>
    import { onMount } from 'svelte';
    export let showDropdown = false;
    export let toggleDropdown;
    export let isAuthenticated;
    let isLoading = false;
  
    async function handleSignOut() {
      isLoading = true;
      try {
        const response = await fetch('http://localhost:8000/signout/', {
          method: 'POST',
          credentials: 'include',
        });
  
        if (!response.ok) {
          throw new Error('Sign out failed');
        }
  
        const result = await response.json();
        if (result.success) {
          window.location.href = '/';
        } else {
          console.error('Sign out failed');
        }
      } catch (error) {
        console.error('Error during sign out:', error);
      } finally {
        isLoading = false;
      }
    }
  </script>
  
  
  <style>  
    .icon {
      font-size: 1.5rem;
      margin-right: 0.5rem;
      transition: all 0.3s ease;
    }
  
    .profile-icon:hover,
    .notification-icon:hover {
      color: white;
      background-color: #191919;
      border-radius: 50%;
      padding: 0.25rem;
    }
  
    .dropdown-menu {
      position: absolute;
      top: 100%;
      right: 0;
      background-color: white;
      border: 1px solid #ddd;
      border-radius: 5px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      width: 200px;
      z-index: 1000;
      display: none;
    }
  
    .dropdown-menu.show {
      display: block;
    }
  
    .dropdown-item {
      padding: 10px 20px;
      cursor: pointer;
      color: #242424;
      font-family: "medium-content-sans-serif-font", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      text-decoration: none;
      display: flex;
      align-items: center;
    }
  
    .dropdown-item:hover {
      background-color: #f9f9f9;
    }
  
    .dropdown-divider {
      height: 1px;
      margin: 0.5rem 0;
      overflow: hidden;
      background-color: #e5e5e5;
    }
  
    @media (max-width: 768px) {
      .dropdown-menu {
        width: 100%;
      }
    }

    .loading-indicator {
    display: none;
  }

  .loading-indicator.active {
    display: inline-block;
    font-size: 1.5rem;
    color: #007bff;
    margin-left: 0.5rem;
  }
  </style>
  
  {#if isAuthenticated}
  <li class="nav-item">
    <a class="nav-link" href="#">
      <i class="bi bi-bell icon notification-icon"></i>
    </a>
  </li>
  <li class="nav-item dropdown" on:click={toggleDropdown}>
    <a class="nav-link" href="#" id="profileDropdown">
      <i class="bi bi-person-circle icon profile-icon"></i>
    </a>
    <div class="dropdown-menu {showDropdown ? 'show' : ''}" aria-labelledby="profileDropdown">
      <a class="dropdown-item" href="/settings"><i class="bi bi-gear me-2"></i> Settings</a>
      <div class="dropdown-divider"></div>
      <a class="dropdown-item" href="#" on:click={handleSignOut}>
        <i class="bi bi-box-arrow-right me-2"></i> Sign out
        {#if isLoading}
          <span class="loading-indicator active">...</span>
        {/if}
      </a>
    </div>
  </li>
{/if}