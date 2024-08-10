<script>
  import Modal from "../components/Modal.svelte";
</script>

<style>
  .container {
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .sidebar {
    width: 25%;
    padding-right: 20px;
  }

  .main-content {
    width: 75%;
  }

  .header {
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
  }

  .header h1 {
    font-size: 42px;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif sans-serif;
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
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif sans-serif;
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

  .article-meta {
    display: flex;
    gap: 15px;
    font-size: 0.9em;
    color: #777;
  }

  .profile-card {
    background-color: white;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .profile-card img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  .profile-card h2 {
    font-size: 1.5em;
    margin-bottom: 5px;
  }

  .profile-card p {
    color: #666;
    font-size: 0.9em;
    margin-bottom: 15px;
  }

  .profile-card button {
    background-color: #3a9a00;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    margin-bottom: 10px;
  }

  .profile-card button.secondary {
    background-color: white;
    color: #3a9a00;
    border: 2px solid #3a9a00;
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
            <span>👁 578</span>
            <span>💬 9</span>
          </div>
        </div>
        <img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*P1X6xWGRakSvz9jCSBzV0A.jpeg" alt="Article Image 1">
      </li>
      <li class="article-item">
        <div class="article-content">
          <h2>10 Tips For Effective Web Design</h2>
          <p>
            In this article I will give you 10 tips to make your web designs and layouts effective and not only...
          </p>
          <div class="article-meta">
            <span>Sep 28, 2019</span>
            <span>👁 269</span>
            <span>💬 2</span>
          </div>
        </div>
        <img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*NofVGmEkd_HuBba82kOT3g.jpeg" alt="Article Image 2">
      </li>
    </ul>
  </div>

  <div class="sidebar">
    <div class="profile-card">
      <img src="data:image/jpeg;base64,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" alt="Profile Image">
      <h2>Chistev</h2>
      <p>6.5K Followers</p>
      <p>Web developer and instructor for Traversy Media</p>
      <button class="secondary">✚</button>
    </div>
  </div>
</div>

<Modal modalId="exampleModal" modalTitle="Create an account to like or comment." />
