<script>
	import AccountTab from "./AccountTab.svelte";
    import SecurityTab from "./SecurityTab.svelte";

    export let user;
    export let handleDeleteClick;
  
    let activeTab = "Account";
  
    function changeTab(tab) {
      activeTab = tab;
    }
  </script>
  
  <div class="settings-container">
    <h1 class="settings-header">
      {#if activeTab === "Account"}
        Settings
      {/if}
      {#if activeTab === "Notifications"}
        Email notifications
      {/if}
      {#if activeTab === "Security"}
      Security
    {/if}
    </h1>
    
    <div class="settings-tabs">
      <div class="settings-tab {activeTab === 'Account' ? 'active' : ''}" on:click={() => changeTab('Account')}>Account</div>
      <div class="settings-tab {activeTab === 'Notifications' ? 'active' : ''}" on:click={() => changeTab('Notifications')}>Notifications</div>
      <div class="settings-tab {activeTab === 'Security' ? 'active' : ''}" on:click={() => changeTab('Security')}>Security</div>
    </div>
  
    <div class="settings-section">
      {#if activeTab === "Account"}
      <AccountTab {user} {handleDeleteClick} />
      {/if}
  
      {#if activeTab === "Notifications"}
        <div>
          <label>
            <input type="checkbox" checked>
            Allow email notifications
          </label>
          <p>You'll receive emails for responses to your comments.</p>
        </div>
      {/if}

      {#if activeTab === "Security"}
      <SecurityTab />
    {/if}
    </div>
  </div>
  
  <style>
    .settings-container {
      padding: 2rem;
      font-family: 'medium-content-sans-serif-font', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      max-width: 800px;
      margin: auto;
    }
  
    .settings-header {
      font-size: 42px;
      line-height: 52px;
      color: #242424;
      margin-bottom: 2rem;
      font-family: 'Helvetica Neue', sans-serif;
      font-weight: 500;
    }
  
    .settings-tabs {
      display: flex;
      border-bottom: 1px solid #ddd;
      margin-bottom: 2rem;
      gap: 1.5rem;
    }
  
    .settings-tab {
      font-family: 'Helvetica Neue', sans-serif;
      padding-bottom: 0.5rem;
      cursor: pointer;
      color: #000000;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
    }
  
    .settings-tab.active {
      border-bottom: 2px solid #191919;
    }
  
    .settings-section {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
  
    .settings-section div {
      margin-bottom: 1rem;
    }
  
    label {
      display: flex;
      align-items: center;
      font-family: 'Helvetica Neue', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #242424;
    }
  
    input[type="checkbox"] {
      margin-right: 10px;
    }
  
    p {
      font-family: 'Helvetica Neue', sans-serif;
      font-size: 14px;
      color: #888;
      margin-top: 10px;
    }
  </style>
  