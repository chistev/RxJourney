<script>
  let searchQuery = '';

  function handleSearch(event) {
    event.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
    }
  }
</script>

<nav class="navbar">
  <div class="container">
    <a class="navbar-brand" href="/">RxJourney</a>

    <form on:submit={handleSearch} class="search-form">
      <input
        type="text"
        class="search-input"
        bind:value={searchQuery}
        placeholder="Search…"
        aria-label="Search posts"
      />
      <button type="submit" class="search-button" aria-label="Search">
        <i class="bi bi-search"></i>
      </button>
    </form>
  </div>
</nav>

<style>
  .navbar {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid #eee;
    padding: 0.85rem 1.25rem;
  }

  .container {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
  }

  .navbar-brand {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 700;
    font-size: 1.35rem;
    letter-spacing: -0.02em;
    color: #111;
    text-decoration: none;
  }

  .search-form {
    display: flex;
    align-items: center;
    background: #f5f5f5;
    border-radius: 999px;
    padding: 0.35rem 0.6rem 0.35rem 1rem;
    max-width: 280px;
    width: 100%;
    transition: background 0.2s;
  }

  .search-form:focus-within {
    background: #eee;
  }

  .search-input {
    border: none;
    background: transparent;
    outline: none;
    font-size: 0.95rem;
    color: #222;
    width: 100%;
  }

  .search-input::placeholder {
    color: #999;
  }

  .search-button {
    background: none;
    border: none;
    color: #666;
    font-size: 1rem;
    padding: 0.25rem;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .search-button:hover {
    color: #111;
  }

  @media (max-width: 640px) {
    .search-form {
      max-width: 180px;
    }
  }
</style>