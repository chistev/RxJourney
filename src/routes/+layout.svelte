<script>
	import Navbar from "../components/Navbar.svelte";
  export let data;

  const { isAdmin, isAuthenticated } = data;

  </script>
  
  <Navbar {isAdmin} {isAuthenticated} />

  <slot></slot>
  