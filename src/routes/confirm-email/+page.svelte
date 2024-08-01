<script>
  import { fetchCsrfToken, validateEmail, checkEmail } from '../../utils'
  export let data; // Import the data prop

  let { valid, formData } = data; // Destructure the data prop
  let email = '';
  let emailError = '';
  let csrfToken = '';
  let emailExistsError = '';
  let loading = false; 

  async function handleContinue() {
    emailError = validateEmail(email);
    if (!emailError) {
      loading = true; 
      try {
        csrfToken = await fetchCsrfToken();
        const data = await checkEmail(email, csrfToken);

        if (data.exists) {
          emailExistsError = 'This email address is already registered.';
        } else {
          emailExistsError = ''; 
          alert(`A new magic link has been sent to ${email}.`);
          window.location.href = '/';
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        loading = false;
      }
    }
  }
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    background-color: #fff;
    padding: 20px;
  }

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .header h1 {
    margin-left: 10px;
    font-size: 24px;
    font-weight: 500;
  }

  h1 {
    font-size: 32px;
    margin-bottom: 20px;
    font-family: Georgia, 'Times New Roman', Times, serif;
  }

  p {
    margin-bottom: 20px;
    font-size: 19px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
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

  .input-container {
    margin-bottom: 20px;
    text-align: left;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .input-container label {
    display: block;
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: 500;
  }
</style>

<div class="container">
  <div class="header">
    <h1><a href="/" style="text-decoration: none; color: inherit;">RxJourney</a></h1>
  </div>

  {#if valid}
    <h1>Almost there!</h1>
    <p>Finish creating your account so that you can upgrade to membership.</p>
    <div class="input-container">
      <label>Your full name</label>
      <input type="text" value={formData} readonly />
    </div>
    <div class="input-container">
      <label>Your email</label>
      <input type="email" value={formData} readonly />
    </div>
    <button>Create account</button>
  {:else}
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
  {/if}
</div>
