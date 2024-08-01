<script>
  import { fetchCsrfToken, validateEmail, checkEmail } from '../../utils'
  import AlmostThere from '../../components/AlmostThere.svelte';
  import ExpiredLink from '../../components/ExpiredLink.svelte';

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
</style>

<div class="container">
  <div class="header">
    <h1><a href="/" style="text-decoration: none; color: inherit;">RxJourney</a></h1>
  </div>

  {#if valid}
  <AlmostThere {formData} />
  {:else}
    <ExpiredLink
      {email}
      {emailError}
      {emailExistsError}
      {loading}
      {handleContinue}
    />
  {/if}
</div>
