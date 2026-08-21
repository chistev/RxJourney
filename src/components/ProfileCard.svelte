<script>
  export let backgroundColor = "white";
  import { subscriberCount } from '../stores/subscriberStore';
  import { onDestroy } from 'svelte';
  import { fetchCsrfToken } from '../utils';

  let showEmailInput = false;
  let email = "";
  let count;
  let isLoading = false;
  let errorMessage = "";
  let successMessage = "";

  const unsubscribe = subscriberCount.subscribe(value => {
    count = value;
  });

  onDestroy(() => {
    unsubscribe();
  });

  async function subscribe() {
    if (!validateEmail(email)) {
      errorMessage = "Please enter a valid email address.";
      return;
    }
    isLoading = true;
    try {
      const token = await grecaptcha.execute("6Lfml2ArAAAAADPLiuP4S0n47Wh6x7Itc9KA5e4z", { action: "subscribe" });
      const csrfToken = await fetchCsrfToken();
      const response = await fetch('https://rxjourneyserver.pythonanywhere.com/home/subscribe/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify({ email, recaptcha_token: token })
      });
      const data = await response.json();
      if (response.ok) {
        successMessage = data.message;
        alert(successMessage);
        showEmailInput = false;
        email = "";
        errorMessage = "";
      } else if (response.status === 400 || response.status === 200) {
        errorMessage = data.message;
      } else {
        errorMessage = "An error occurred. Please try again.";
      }
    } catch (error) {
      errorMessage = "An error occurred. Please try again.";
    } finally {
      isLoading = false;
    }
  }

  function handleClickSubscribe() {
    showEmailInput = true;
    errorMessage = "";
    successMessage = "";
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
</script>

<aside class="profile-card" style="background-color: {backgroundColor};">
  <img src="/RxJourney.png" alt="RxJourney" class="avatar" />
  <h2 class="name">Chistev</h2>
  <p class="role">Pharmacist · Web developer</p>
  <p class="count">{count} {count === 1 ? 'subscriber' : 'subscribers'}</p>

  <div class="rss">
    <a href="https://rxjourneyserver.pythonanywhere.com/rss_feed/rss/" target="_blank" rel="noopener">
      <i class="fas fa-rss"></i>
      <span>RSS</span>
    </a>
  </div>

  <div class="subscribe">
    {#if showEmailInput}
      <input
        type="email"
        placeholder="Your email"
        bind:value={email}
        disabled={isLoading}
        class="email-input"
      />
      <button class="btn secondary" on:click={subscribe} disabled={isLoading || !email}>
        {isLoading ? '…' : 'Subscribe'}
      </button>
      {#if errorMessage}
        <p class="error">{errorMessage}</p>
      {/if}
    {:else}
      <button class="btn primary" on:click={handleClickSubscribe}>
        Subscribe
      </button>
    {/if}
  </div>
</aside>

<style>
  .profile-card {
    padding: 1.75rem 1.5rem;
    border-radius: 12px;
    text-align: center;
    border: 1px solid #eee;
  }

  @media (min-width: 900px) {
    .profile-card {
      position: sticky;
      top: 5.5rem;
    }
  }

  .avatar {
    width: 84px;
    height: 84px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
  }

  .name {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 1.15rem;
    font-weight: 700;
    color: #111;
    margin: 0 0 0.25rem;
  }

  .role {
    font-size: 0.9rem;
    color: #666;
    margin: 0 0 0.5rem;
  }

  .count {
    font-size: 0.85rem;
    color: #888;
    margin: 0 0 1.25rem;
  }

  .rss a {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.85rem;
    color: #666;
    text-decoration: none;
  }

  .rss a:hover {
    color: #e85d04;
  }

  .rss i {
    font-size: 1.1rem;
    color: #e85d04;
  }

  .subscribe {
    margin-top: 1.5rem;
  }

  .email-input {
    width: 100%;
    padding: 0.65rem 0.85rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 0.95rem;
    margin-bottom: 0.6rem;
    box-sizing: border-box;
  }

  .btn {
    width: 100%;
    padding: 0.7rem 1rem;
    border-radius: 8px;
    border: none;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }

  .btn.primary {
    background: #111;
    color: #fff;
  }

  .btn.primary:hover {
    background: #333;
  }

  .btn.secondary {
    background: #f0f0f0;
    color: #111;
  }

  .error {
    color: #c0392b;
    font-size: 0.85rem;
    margin-top: 0.5rem;
  }
</style>