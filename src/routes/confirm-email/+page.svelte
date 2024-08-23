<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  export let data;
  
  // Destructure the data prop
  const { valid } = data;
  
  let message = '';
  let isValid = false;

  onMount(() => {
      if (valid) {
          message = `Thank you! Your subscription has been successfully confirmed.`;
          isValid = true;

          // Redirect to the homepage after 3 seconds
          setTimeout(() => {
              goto('/');
          }, 3000);
      } else {
          message = `The confirmation link is invalid or has expired. Please try subscribing again.`;
      }
  });
</script>


<div class="container">
  <div class="main-content">
      <div class="header">
          <h1>Confirm Your Subscription</h1>
      </div>
      <div class="confirmation-message">
          <p>{message}</p>
          {#if isValid}
              <p>You will be redirected to the homepage shortly...</p>
          {/if}
      </div>
  </div>
</div>

<style>
  .container {
      display: flex;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      flex-direction: column-reverse;
  }

  .main-content {
      width: 100%;
  }

  .header {
      margin-bottom: 20px;
      border-bottom: 1px solid #ddd;
  }

  .header h1 {
      font-size: 36px;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      margin-bottom: 10px;
      font-weight: 500;
      line-height: 42px;
      color: #191919;
  }

  .confirmation-message {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 18px;
      line-height: 1.5;
      color: #333;
      padding: 20px;
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 5px;
  }

  .confirmation-message p {
      margin-bottom: 10px;
  }

  @media (min-width: 600px) {
      .container {
          flex-direction: row;
      }

      .main-content {
          width: 75%;
      }
  }
</style>
