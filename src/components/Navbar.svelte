<script>
  let searchQuery = '';
  let showSearch = false;

  function handleSearch(event) {
    event.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
    }
  }

  function toggleSearch() {
    showSearch = !showSearch;
  }
</script>

<nav class="navbar">
  <div class="container">
    <a class="navbar-brand" href="/">RxJourney</a>
    <button class="hamburger" on:click={toggleSearch}>
      <i class="bi bi-list"></i>
    </button>
    <form on:submit={handleSearch} class="search-form {showSearch ? 'show' : ''}">
      <input type="text" class="search-input" bind:value={searchQuery} placeholder="Search">
      <button type="submit" class="search-button">
        <i class="bi bi-search"></i>
      </button>
    </form>
  </div>
</nav>

<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #fff;
  }

  .navbar-brand {
    font-family: "Helvetica Neue", Arial, sans-serif;
    font-weight: bold;
    font-size: 24px;
    color: #333;
    text-decoration: none;
  }

  .search-form {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
    max-width: 500px;
    width: 100%;
    transition: max-width 0.3s ease;
  }

  .search-form.show {
    display: flex;
  }

  .search-input {
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 16px;
    color: #333;
    padding: 0.5rem;
    flex-grow: 1;
  }

  .search-button {
    background: none;
    border: none;
    color: #007bff;
    font-size: 16px;
    padding: 0.5rem;
    cursor: pointer;
  }

  .search-button:hover {
    color: #0056b3;
  }

  .hamburger {
    display: none;
    background: none;
    border: none;
    font-size: 24px;
    color: #333;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .search-form {
      display: none;
    }

    .search-form.show {
      display: flex;
    }

    .hamburger {
      display: block;
    }
  }
</style>
