<script>
  import Modal from "../components/Modal.svelte";
	import ProfileCard from "../components/ProfileCard.svelte";
</script>

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

  .article-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .article-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 20px;
    max-width: 700px; /* Limit the width of the article item */
  }

  .article-item img {
    width: 150px;
    height: 100px;
    object-fit: cover;
    margin-left: 20px;
  }

  .article-content {
    flex: 1;
  }

  .article-content p {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #191919;
  }

  .article-meta {
    display: flex;
    gap: 15px;
    font-size: 0.9em;
    color: #777;
  }

  .article-meta span {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #191919;
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


<div class="container">
  <div class="main-content">
    <div class="header">
      <h1 class="mb-4">Chistev</h1>
      <div class="nav-links">
        <a href="#" class="active">Home</a>
        <a href="#">About</a>
      </div>
    </div>

    <ul class="article-list">
      <li class="article-item">
        <div class="article-content">
          <h2>6 Tips When Learning To Code</h2>
          <p>
            Learning to code can be a very overwhelming thing for many people. I’d say that it is for most people...
          </p>
          <div class="article-meta">
            <span>Feb 1, 2022</span>
            <span><i class="bi bi-hand-thumbs-up-fill"></i> 578</span>
            <span><i class="bi bi-chat-right-fill"></i> 9</span>
          </div>
        </div>
        <img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*P1X6xWGRakSvz9jCSBzV0A.jpeg" alt="Article Image 1">
      </li>
    </ul>
  </div>

  <ProfileCard/>
</div>

<Modal modalId="exampleModal" modalTitle="Create an account to like or comment." />
