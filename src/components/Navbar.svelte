<script>
  import { userStore } from '../stores/userStore'; // Import the store
  import { onMount, onDestroy } from 'svelte';
  import UserMenu from './UserMenu.svelte';
  
  let showDropdown = false;
  let searchQuery = '';

  // Local variables to hold store values
  let isAdmin = false;
  let isAuthenticated = false;

  // Subscribe to the store
  const unsubscribe = userStore.subscribe(user => {
    isAdmin = user.isAdmin;
    isAuthenticated = user.isAuthenticated;
  });

  function toggleDropdown(event) {
    event.stopPropagation();
    showDropdown = !showDropdown;
  }

  function closeDropdown(event) {
    if (typeof document !== 'undefined') { // Ensure document is available
      const dropdown = document.querySelector('.dropdown-menu');
      if (dropdown && !dropdown.contains(event.target)) {
        showDropdown = false;
      }
    }
  }

  function handleWriteClick(event) {
    if (isAuthenticated) {
      window.location.href = '/write';
    } else {
      if (typeof document !== 'undefined') { // Ensure document is available
        const modalTrigger = document.querySelector('#exampleModal');
        if (modalTrigger) {
          modalTrigger.click();
        }
      }
    }
  }

  function handleSearch(event) {
    event.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
    }
  }

  onMount(() => {
    if (typeof document !== 'undefined') { // Ensure document is available
      document.addEventListener('click', closeDropdown);
    }
  });

  onDestroy(() => {
    if (typeof document !== 'undefined') { // Ensure document is available
      document.removeEventListener('click', closeDropdown);
    }
    unsubscribe(); // Unsubscribe from the store when component is destroyed
  });
</script>

<nav class="navbar navbar-expand-lg">
  <div class="container">
    <a class="navbar-brand" href="/">RxJourney</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse" id="navbarNav">
      <div class="d-flex align-items-center mx-auto mx-lg-0">
        <div class="search-box me-3 d-none d-lg-flex">
          <i class="bi bi-search search-icon"></i>
          <form on:submit={handleSearch}>
            <input type="text" class="search-input" bind:value={searchQuery} placeholder="Search">
          </form>
        </div>
      </div>
      <ul class="navbar-nav ms-auto d-flex align-items-center">
        {#if isAdmin}
          <li class="nav-item">
            <a class="nav-link d-flex align-items-center me-3" href="#" on:click|preventDefault={handleWriteClick}>
              <i class="bi bi-pencil-square me-2"></i> Write
            </a>
          </li>
        {/if}
        {#if isAuthenticated}
          <UserMenu {showDropdown} toggleDropdown={toggleDropdown} {isAuthenticated}/>
        {:else}
          <li class="nav-item">
            <button class="btn sign-up me-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Sign up</button>
          </li>
          <li class="nav-item">
            <a class="nav-link me-3" href="/signin">Sign in</a>
          </li>
        {/if}
      </ul>
    </div>
  </div>
</nav>

<style>
  .navbar-brand {
    font-family: "medium-content-sans-serif-font", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: bolder;
    font-size: 26px;
    color: #191919;
  }

  .search-box {
    display: flex;
    align-items: center;
    background-color: #f9f9f9;
    padding: 0.5rem;
    border-radius: 5px;
  }

  .search-input {
    border: none;
    outline: none;
    background-color: #f9f9f9;
    font-size: 16px;
    color: #191919;
    padding-left: 0.5rem;
  }

  .search-icon {
    color: #191919;
    font-size: 16px;
  }

  .sign-up {
    background-color: green !important;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
  }

  .sign-up:hover {
    background-color: darkgreen;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
</style>