<script>
  export let backgroundColor = "white";
  import { onMount } from "svelte";
  import { fetchCsrfToken } from '../utils';

  let showTooltip = false;
  let subscriberCount = 0;
  let isSubscribed = false;
  let isLoading = true; // Track loading state

  function toggleTooltip() {
    showTooltip = !showTooltip;
  }

  async function subscribe() {
    try {
      const csrfToken = await fetchCsrfToken();
      const response = await fetch('http://localhost:8000/home/subscribe/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
      });

      if (response.ok) {
        isSubscribed = true;
        subscriberCount += 1;
      } else {
        console.error('Failed to subscribe:', await response.text());
      }
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  }

  async function unsubscribe() {
    try {
      const csrfToken = await fetchCsrfToken();
      const response = await fetch('http://localhost:8000/home/unsubscribe/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
      });

      if (response.ok) {
        isSubscribed = false;
        subscriberCount -= 1;
      } else {
        console.error('Failed to unsubscribe:', await response.text());
      }
    } catch (error) {
      console.error('Error unsubscribing:', error);
    }
  }

  function handleSubscription() {
    if (isSubscribed) {
      unsubscribe();
    } else {
      subscribe();
    }
  }

  function handleClickOutside(event) {
    if (showTooltip && !event.target.closest('.tooltip-container')) {
      showTooltip = false;
    }
  }

  onMount(async () => {
    document.addEventListener('click', handleClickOutside);

    try {
      const countResponse = await fetch('http://localhost:8000/home/subscriber-count/');
      const countData = await countResponse.json();
      subscriberCount = countData.subscriber_count;

      const subscriptionResponse = await fetch('http://localhost:8000/home/check-subscription/', {
        method: 'GET',
        credentials: 'include',
      });
      const subscriptionData = await subscriptionResponse.json();
      isSubscribed = subscriptionData.is_subscribed;
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      isLoading = false; // Loading complete
    }

    return () => document.removeEventListener('click', handleClickOutside);
  });
</script>

<div class="profile-card" style="background-color: {backgroundColor};">
  <img src="data:image/jpeg;base64,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" alt="Profile Image">
  <h2>Chistev</h2>
  <p>{subscriberCount} subscribers</p>
  <p>Intern Pharmacist and Web developer</p>
  <div class="tooltip-container">
    <button class="secondary" on:click={handleSubscription} on:mouseenter={toggleTooltip} on:mouseleave={toggleTooltip} disabled={isLoading}>
      <span class="icon-only">
        {#if isLoading}
          <i class="bi bi-hourglass-split fs-2"></i> <!-- Loading icon -->
        {:else if isSubscribed}
          <i class="bi bi-check-circle fs-2"></i> <!-- Subscribed icon -->
        {:else}
          <i class="bi bi-newspaper fs-2"></i> <!-- Unsubscribed icon -->
        {/if}
      </span>
      <span class="text-only">
        {isLoading ? 'Loading...' : isSubscribed ? 'Unsubscribe' : 'Subscribe'}
      </span>
    </button>
    {#if showTooltip && !isLoading}
      <div class="tooltip">
        {isSubscribed ? 'Unsubscribe to stop receiving notifications.' : 'Subscribe to get an email whenever Chistev publishes.'}
      </div>
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

  /* Sticky position only on large screens */
  @media (min-width: 768px) {
    .profile-card {
      position: sticky; 
      top: 20px; 
    }
  }

  .profile-card img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 10px;
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

  .profile-card button {
    background-color: #3a9a00;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    margin-bottom: 10px;
    font-size: 14px; /* Adjust font size for smaller screens */
  }

  .profile-card button.secondary {
    background-color: white;
    color: #3a9a00;
    border: 2px solid #3a9a00;
  }

  .tooltip-container {
    position: relative;
    display: inline-block;
  }

  .tooltip {
    visibility: hidden;
    background-color: #fff;
    color: #000;
    text-align: left;
    padding: 8px;
    border-radius: 4px;
    position: absolute;
    z-index: 1;
    top: 125%;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 200px; /* Adjust width as necessary */
  }

  .tooltip::after {
    content: "";
    position: absolute;
    top: 100%; /* At the bottom of the tooltip */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: white transparent transparent transparent;
  }

  /* Show tooltip on hover */
  .tooltip-container:hover .tooltip {
    visibility: visible;
    opacity: 1;
  }

  /* Define the pulse animation */
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  /* Hide the text-only span on larger screens */
  .text-only {
    display: none;
  }

  /* Hide the icon-only span on smaller screens */
  .icon-only {
    display: inline;
  }

  /* Media query for small screens */
  @media (max-width: 600px) {
    .icon-only {
      display: none;
    }

    .text-only {
      display: inline;
    }

    /* Apply animation only on smaller screens */
    .profile-card button.secondary {
      animation: pulse 1.5s infinite;
    }

    .profile-card {
    background-color: white;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    height: 300px;
  }
  }
</style>
