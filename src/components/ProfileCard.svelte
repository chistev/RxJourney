<script>
    import { onMount } from "svelte";
  
    let showTooltip = false;
  
    function toggleTooltip() {
      showTooltip = !showTooltip;
    }
  
    function handleClickOutside(event) {
      if (showTooltip && !event.target.closest('.tooltip-container')) {
        showTooltip = false;
      }
    }
  
    onMount(() => {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    });
  </script>
  
  <div class="profile-card">
    <img src="" alt="Profile Image">
    <h2>Chistev</h2>
    <p>6.5K Followers</p>
    <p>Web developer and instructor for Traversy Media</p>
    <div class="tooltip-container">
      <button class="secondary" on:click={toggleTooltip}>
        <i class="bi bi-newspaper fs-2"></i>
      </button>
      <div class="tooltip">
        Subscribe to get an email whenever Chistev publishes.
      </div>
    </div>
  </div>
  <style>
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
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-weight: 500;
      font-size: 16x;
      line-height: 20px;
      color: #242424;
    }
  
    .profile-card p {
      color: #191919;
      font-size: 16px;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      margin-bottom: 15px;
      font-weight: 400;
      line-height: 24px;
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
  
    .tooltip-container {
      position: relative;
      display: inline-block;
    }
  
    .tooltip {
      visibility: hidden;
      background-color: #fff;
      color: #000;
      text-align: left;
      padding: 8px;
      border-radius: 4px;
      position: absolute;
      z-index: 1;
      top: 125%;
      left: 50%;
      transform: translateX(-50%);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      width: 200px; /* Adjust width as necessary */
    }
  
    .tooltip::after {
      content: "";
      position: absolute;
      top: 100%; /* At the bottom of the tooltip */
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: white transparent transparent transparent;
    }
  
     /* Show tooltip on hover */
     .tooltip-container:hover .tooltip {
      visibility: visible;
      opacity: 1;
    }
  
    /* Define the pulse animation */
    @keyframes pulse {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.1);
        opacity: 0.8;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
  </style>