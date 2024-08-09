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

  // Add event listener for click events on document
  // Only run this code on the client side
  import { onMount } from 'svelte';
  import { onDestroy } from 'svelte';

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
            <a class="nav-link d-flex align-items-center me-3" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">
              <i class="bi bi-pencil-square"></i> Write
            </a>
          </li>
        {/if}
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
              <a class="dropdown-item" href="/recommendations"><i class="bi bi-funnel"></i> Refine recommendations</a>
              <a class="dropdown-item" href="/publications"><i class="bi bi-newspaper"></i> Manage publications</a>
              <a class="dropdown-item" href="/help"><i class="bi bi-question-circle"></i> Help</a>
              <a class="dropdown-item" href="/signout"><i class="bi bi-box-arrow-right"></i> Sign out</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#"><i class="bi bi-envelope"></i> st••••••••@gmail.com</a>
            </div>
          </li>
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