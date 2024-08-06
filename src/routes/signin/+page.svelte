<script>
  import { validateEmail, fetchCsrfToken } from '../../utils';

  let email = '';
  let password = '';
  let emailError = '';
  let generalError = '';
  let loading = false;

  const handleEmailInput = (event) => {
    email = event.target.value;
    emailError = validateEmail(email);
  };

  const handlePasswordInput = (event) => {
    password = event.target.value;
  };

  const handleSubmit = async () => {
    emailError = validateEmail(email);
    console.log(`Email validation error on submit: ${emailError}`);
    if (!emailError) {
      loading = true;
      generalError = '';
      try {
        const csrfToken = await fetchCsrfToken();
        
        const response = await fetch('http://localhost:8000/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
          credentials: 'include',
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          window.location.href = '/';
        } else {
          generalError = data.error || 'Invalid email or password. Please try again.';
        }
      } catch (error) {
        console.error('Error during submission:', error);
        generalError = 'An unexpected error occurred. Please try again later.';
      } finally {
        loading = false;
      }
    } else {
      console.log('Email validation error, form not submitted.');
    }
  };
</script>

<style>
  .container {
    max-width: 400px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    box-sizing: border-box;
  }

  .signin-title {
    font-family: "medium-content-sans-serif-font", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: bolder;
    font-size: 26px;
    color: #191919;
    margin-bottom: 1rem;
  }

  .email-input,
  .password-input {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1.5rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
  }

  .signin-button {
    width: 100%;
    padding: 0.75rem;
    background-color: #191919;
    color: white;
    border: none;
    border-radius: 5px;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 16px;
    cursor: pointer;
  }

  .signin-button:hover {
    background-color: darkgray;
  }

  .error-message {
    color: red;
    font-size: 14px;
    margin-bottom: 1rem;
  }

  .loading {
    margin-top: 1rem;
  }
</style>

<div class="container">
  <div class="signin-title">Sign in with email</div>
  <input
    type="email"
    class="email-input"
    placeholder="Your email"
    on:input={handleEmailInput}
  />
  {#if emailError}
    <div class="error-message">{emailError}</div>
  {/if}
  <input
    type="password"
    class="password-input"
    placeholder="Your password"
    on:input={handlePasswordInput}
  />
  <button class="signin-button" on:click={handleSubmit} disabled={loading}>
    Continue
  </button>
  {#if generalError}
    <div class="error-message">{generalError}</div>
  {/if}
  {#if loading}
    <div class="loading">Loading...</div>
  {/if}
</div>
