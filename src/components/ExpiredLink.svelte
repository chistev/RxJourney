<script>
    export let email;
    export let emailError;
    export let emailExistsError;
    export let loading;
    export let handleContinue;
  </script>
  
  <style>
    .error-message {
      color: red;
      font-size: 14px;
      margin-top: 5px;
    }
  
    .loading {
      color: #555;
      font-size: 16px;
      margin-top: 10px;
    }
  
    .expired-header {
      font-family: Georgia, 'Times New Roman', Times, serif;
      font-weight: 500;
      font-size: 32px;
      line-height: 36px;
      color: rgba(0, 0, 0, 0.84);
    }
  
    .expired-paragraph {
      font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
      font-weight: 400;
      font-size: 19px;
      line-height: 24px;
      color: rgba(0, 0, 0, 0.76);
      width: 85%;
      margin-bottom: 20px;
    }
  
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  
    input[type="email"], input[type="text"] {
      width: 300px;
      max-width: 100%;
      padding: 10px;
      margin-bottom: 20px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  
    button {
      background-color: #2e7d32;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
  
    button:hover {
      background-color: #276f2a;
    }
  </style>
  
  <h1 class="expired-header">Your sign up link has expired</h1>
  <p class="expired-paragraph">Enter the email address associated with your account, and we’ll send a new magic link to your inbox.</p>
  <form on:submit|preventDefault={handleContinue}>
    <input
      type="email"
      name="email"
      placeholder="Your email"
      bind:value={email}
      class:invalid={emailError || emailExistsError}
      required
    />
    {#if emailError}
      <div class="error-message">{emailError}</div>
    {/if}
    {#if emailExistsError}
      <div class="error-message">{emailExistsError}</div>
    {/if}
    {#if loading}
      <div class="loading">Checking email... Please wait.</div>
    {/if}
    <button type="submit">Continue</button>
  </form>
  