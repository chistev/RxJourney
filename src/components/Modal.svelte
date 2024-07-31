<script>
  import { onMount } from "svelte";

  export let modalId = "exampleModal";
  export let modalTitle = "Create an account to like or comment.";
  let showEmailForm = false;
  let email = '';
  let emailError = '';

  function handleSignupWithEmail() {
    showEmailForm = true;
  }

  function validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      emailError = 'Please enter a valid email address.';
    } else {
      emailError = '';
      console.log('Success: Email is valid.');
    }
  }

  function handleContinue() {
    validateEmail();
    if (!emailError) {
      // Email is valid, proceed with signup
      console.log('Success: Proceeding with signup.');
    }
  }

  onMount(() => {
    const modalElement = document.getElementById(modalId);
    modalElement.addEventListener('hide.bs.modal', () => {
      showEmailForm = false;
      email = '';
      emailError = '';
    });
  });
</script>

<style>
  .modal-title {
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-weight: 400;
    font-size: 28px;
    line-height: 32px;
    color: #000000;
  }

  .modal-footer small {
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    color: #6b6b6b;
  }

  .modal-footer a {
    color: #6b6b6b;
  }

  .auth-link {
    color: #156d12;
    font-size: 16px;
    font-weight: 700;
    text-decoration: none;
  }

  .email-signup-title {
    font-size: 20px;
    font-weight: 600;
  }

  .email-input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    margin-bottom: 10px;
  }

  .email-input.invalid {
    border: 2px solid red;
  }

  .email-signup-button {
    width: 100%;
    padding: 10px;
    background-color: #000;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    border: none;
  }

  .error-message {
    color: red;
    font-size: 14px;
  }
</style>

<div class="modal fade" id={modalId} tabindex="-1" aria-labelledby={modalId + "Label"} aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id={modalId + "Label"}>
          {#if showEmailForm}
            Sign up with email
          {/if}
          {#if !showEmailForm}
            {modalTitle}
          {/if}
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        {#if !showEmailForm}
          <button class="btn btn-outline-dark w-100 mb-3 auth-button" on:click={handleSignupWithEmail}>
            <i class="bi bi-envelope me-2"></i> Sign up with email
          </button>
          <div class="text-center mt-3">
            Already have an account? <a href="#" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#signInModal" class="auth-link">Sign in</a>
          </div>
        {/if}

        {#if showEmailForm}
          <input
            type="email"
            class="email-input {emailError ? 'invalid' : ''}"
            placeholder="Your email"
            bind:value={email}
          />
          {#if emailError}
            <div class="error-message">{emailError}</div>
          {/if}
          <button class="email-signup-button" on:click={handleContinue}>Continue</button>
        {/if}
      </div>
      {#if !showEmailForm}
        <div class="modal-footer">
          <small>Click "Sign up" to agree to RxJourney's <a href="#">Terms of Service</a> and acknowledge that RxJourney's <a href="#">Privacy Policy</a> applies to you.</small>
        </div>
      {/if}
    </div>
  </div>
</div>
