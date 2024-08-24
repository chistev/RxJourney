<script>
  import Navbar from "../components/Navbar.svelte";
</script>

<Navbar />

<slot></slot>

<!-- The head block allows individual pages to set their own title and meta tags -->
<svelte:head>
  <!-- Default title and meta description in case the page does not provide one -->
  <title>RxJourney</title>
  <meta name="description" content="The Journey of an Intern Pharmacist" />
</svelte:head>
