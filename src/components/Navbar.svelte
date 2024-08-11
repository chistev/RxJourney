<script>
  export let isAdmin;
  export let isAuthenticated;
  let showDropdown = false;

  function toggleDropdown(event) {
    event.stopPropagation();
    showDropdown = !showDropdown;
  }

  function closeDropdown(event) {
    const dropdown = document.querySelector('.dropdown-menu');
    if (dropdown && !dropdown.contains(event.target)) {
      showDropdown = false;
    }
  }

  // Function to handle the "Write" button click
  function handleWriteClick(event) {
    if (isAuthenticated) {
      // If authenticated, navigate to the write page
      window.location.href = '/write';
    } else {
      // If not authenticated, trigger the modal
      const modalTrigger = document.querySelector('#exampleModal');
      if (modalTrigger) {
        modalTrigger.click();
      }
    }
  }

  // Add event listener for click events on document
  // Only run this code on the client side
  import { onMount } from 'svelte';
  import { onDestroy } from 'svelte';
  import UserMenu from './UserMenu.svelte';

  onMount(() => {
    document.addEventListener('click', closeDropdown);

    // Remove event listener when the component is destroyed
    onDestroy(() => {
      document.removeEventListener('click', closeDropdown);
    });
  });
</script>

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
          <input type="text" class="search-input" placeholder="Search">
        </div>
      </div>
      <ul class="navbar-nav ms-auto d-flex align-items-center">
        {#if isAdmin}
          <li class="nav-item">
            <!-- Update the Write button to call handleWriteClick -->
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