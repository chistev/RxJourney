<script>
    export let formData;
  </script>
  
  <h1>Almost there!</h1>
  <p>Finish creating your account so that you can upgrade to membership.</p>
  <div class="input-container">
    <label>Your full name</label>
    <input type="text" value={formData} readonly />
  </div>
  <div class="input-container">
    <label>Your email</label>
    <input type="email" value={formData} readonly />
  </div>
  <button>Create account</button>
  
  <style>
    .input-container {
      margin-bottom: 20px;
      text-align: left;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  
    .input-container label {
      display: block;
      margin-bottom: 5px;
      font-size: 16px;
      font-weight: 500;
    }
  
    input[type="email"], input[type="text"] {
      width: 300px;
      max-width: 100%;
      padding: 10px;
      margin-bottom: 20px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  
    button {
      background-color: #2e7d32;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
  
    button:hover {
      background-color: #276f2a;
    }
  </style>
  