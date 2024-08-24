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
      const csrfToken = await fetchCsrfToken();

      const response = await fetch('http://localhost:8000/home/subscribe/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify({ email })
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

<div class="profile-card" style="background-color: {backgroundColor};">
  <img src="/RxJourney.png" alt="Logo for RxJourney by Chistev, an Intern Pharmacist and Web Developer">
  <h2>Chistev</h2>
  <p>{count} subscribers</p>
  <p>Intern Pharmacist and Web developer</p>
  <div class="subscribe-container">
    {#if showEmailInput}
      <input
        type="email"
        placeholder="Enter your email"
        bind:value={email}
        disabled={isLoading}
      />
      <button class="secondary" on:click={subscribe} disabled={isLoading || !email}>
        {isLoading ? 'Subscribing...' : 'Submit'}
      </button>
      {#if errorMessage}
        <p class="error-message">{errorMessage}</p>
      {/if}
    {:else}
      <button class="primary" on:click={handleClickSubscribe}>
        Subscribe
      </button>
    {/if}
  </div>
</div>

<style>
  .profile-card {
    background-color: white;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    height: 350px;
  }

  @media (min-width: 768px) {
    .profile-card {
      position: sticky; 
      top: 20px; 
    }
  }

  .profile-card img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
    object-fit: cover;
  }

  .profile-card h2 {
    font-size: 1.5em;
    margin-bottom: 5px;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #242424;
  }

  .profile-card p {
    color: #191919;
    font-size: 16px;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    margin-bottom: 15px;
    font-weight: 400;
    line-height: 24px;
  }

  .subscribe-container {
    margin-top: 20px;
  }

  .subscribe-container input {
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
    width: 100%;
    box-sizing: border-box;
  }

  .subscribe-container button {
    padding: 10px 20px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
  }

  .subscribe-container button.primary {
    background-color: #3a9a00;
    color: white;
  }

  .subscribe-container button.secondary {
    background-color: #f0f0f0;
    color: #3a9a00;
  }

  .error-message {
    color: red;
    margin-top: 10px;
  }
</style>
