<script>
  import { onMount } from "svelte";
  import { fetchCsrfToken, validateEmail, checkEmail } from '../utils';

  export let modalId = "exampleModal";
  export let modalTitle = "Create an account to like or comment.";
  let showEmailForm = false;
  let email = '';
  let emailError = '';
  let csrfToken = '';
  let showSuccessModal = false;
  let userEmail = '';
  let loading = false;

  function handleSignupWithEmail() {
    showEmailForm = true;
  }

  async function handleContinue() {
    emailError = validateEmail(email);
    if (!emailError) {
      loading = true;
      try {
        const data = await checkEmail(email, csrfToken);
        loading = false;

        if (data.exists) {
          emailError = 'A user with this email already exists.';
        } else {
          userEmail = email;
          showSuccessModal = true;
        }
      } catch (error) {
        loading = false;
        console.error('Error:', error);
      }
    }
  }

  onMount(async () => {
    csrfToken = await fetchCsrfToken();

    const modalElement = document.getElementById(modalId);
    modalElement.addEventListener('hide.bs.modal', () => {
      showEmailForm = false;
      email = '';
      emailError = '';
    });
  });

  function closeModal() {
    const modalElement = document.getElementById(modalId);
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
  }
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

  .loading {
    text-align: center;
    margin-top: 10px;
  }
</style>

<div class="modal fade" id={modalId} tabindex="-1" aria-labelledby={modalId + "Label"} aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      {#if showSuccessModal}
        <div class="modal-body text-center">
          <h5 class="modal-title mb-3">Check your inbox.</h5>
          <p>Click the link we sent to {userEmail} to complete your account set-up.</p>
          <button class="btn" style="background-color: #000; color: #ffffff" on:click={closeModal}>OK</button>
        </div>
      {:else}
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
            {#if loading}
              <div class="loading">Checking email...</div>
            {/if}
          {/if}
        </div>
        {#if !showEmailForm}
          <div class="modal-footer">
            <small>Click "Sign up" to agree to RxJourney's <a href="#">Terms of Service</a> and acknowledge that RxJourney's <a href="#">Privacy Policy</a> applies to you.</small>
          </div>
        {/if}
      {/if}
    </div>
  </div>
</div>

