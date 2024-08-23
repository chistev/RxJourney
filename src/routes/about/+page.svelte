<script>
	import AboutContent from "../../components/AboutContent.svelte";
import ProfileCard from "../../components/ProfileCard.svelte";

</script>
<div class="container">
    <div class="main-content">
      <div class="header">
        <h1 class="mb-4">Chistev</h1>
        <div class="nav-links">
          <a href="/" >Home</a>
          <a href="/about" class="active">About</a>
        </div>
      </div>
  
      <AboutContent/>
    </div>
  
    <ProfileCard/>
  </div>

  <style>
    .container {
      display: flex;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      flex-direction: column-reverse; /* Stack main content and sidebar by default */
    }
  
    .main-content {
      width: 100%; /* Full width on small screens */
    }
  
    .header {
      margin-bottom: 20px;
      border-bottom: 1px solid #ddd;
    }
  
    .header h1 {
      font-size: 42px;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      margin-bottom: 10px;
      font-weight: 500;
      line-height: 52px;
      color: #191919;
    }
  
    .nav-links {
      display: flex;
      gap: 15px;
      font-weight: bold;
    }
  
    .nav-links a {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-weight: 400;
      text-decoration: none;
      color: #000000;
      font-size: 14px;
      line-height: 20px;
    }
  
    .nav-links a.active {
      border-bottom: 2px solid #333;
    }  
    /* Media query for small screens */
    @media (min-width: 600px) {
      .container {
        flex-direction: row; /* Revert to row direction for larger screens */
      }
  
      .main-content {
        width: 75%;
      }
    }
  </style>