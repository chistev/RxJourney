<script>
  import Navbar from "../components/Navbar.svelte";
  import Modal from "../components/Modal.svelte";

  export let data;

  const { isAdmin, isAuthenticated } = data;

</script>

<Navbar {isAdmin} {isAuthenticated}/>

<Modal modalId="exampleModal" modalTitle="Create an account to like or comment." />
