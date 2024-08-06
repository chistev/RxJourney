<script>
  import { fetchCsrfToken } from '../utils';
  
  export let formData;
  
  let fullName = formData.email.split('@')[0]; // Derive the full name from the email
  let password = ''; // New state for password
  let errorMessage = '';
  let csrfToken = '';
  let loading = false; // Add loading state

  async function createAccount() {
    console.log("Starting createAccount function");

    if (fullName.length < 5) {
      errorMessage = 'Full name must be at least 5 characters long.';
      console.log(errorMessage);
      return;
    }

    if (password.length < 8) {
      errorMessage = 'Password must be at least 8 characters long.';
      console.log(errorMessage);
      return;
    }

    console.log("Full name and password are valid");

    if (!csrfToken) {
      console.log("Fetching CSRF token");
      csrfToken = await fetchCsrfToken();
      console.log("CSRF token received:", csrfToken);
    }

    loading = true; // Set loading to true when the request starts

    try {
      console.log("Sending request to create account with data:", {
        email: formData.email,
        fullName,
        password, // Include password in the request
        token: formData.token
      });

      const response = await fetch('http://localhost:8000/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken
        },
        body: JSON.stringify({ email: formData.email, fullName, password, token: formData.token }) // Send password in the request
      });

      console.log("Response received from server");

      const data = await response.json();
      console.log("Response data:", data);

      if (data.success) {
        console.log("Account creation successful, redirecting to homepage");
        window.location.href = '/';
      } else {
        errorMessage = data.message;
        console.log("Error message:", errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
      errorMessage = 'An error occurred. Please try again.';
    } finally {
      loading = false; // Set loading to false when the request completes
    }
  }
</script>

<h1>Almost there!</h1>
<p>Finish creating your account so that you can upgrade to membership.</p>
<div class="input-container">
  <label>Your full name</label>
  <input type="text" bind:value={fullName} /> 
</div>

<div class="input-container">
  <label>Your password</label>
  <input type="password" bind:value={password} /> 
</div>

<div class="input-container">
  <label>Your email</label>
  <input type="email" value={formData.email} readonly />
</div>

{#if loading}
  <p class="loading">Creating account... Please wait.</p>
{/if}
<button on:click={createAccount} disabled={loading}>Create account</button>
<p style="color: red;">{errorMessage}</p>

<style>
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

  input[type="email"], input[type="text"], input[type="password"] {
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

  .loading {
    color: #555;
    font-size: 16px;
    margin-top: 10px;
  }
</style>
