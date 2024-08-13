<script>
    export let onSubmit;
    export let isDisabled = false;
  </script>
  
  <button 
    class="submit-comment" 
    on:click={onSubmit} 
    disabled={isDisabled}
  >
    Respond
  </button>
  
  <style>
    .submit-comment {
      align-self: flex-end;
      padding: 10px 20px;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 14px;
      font-weight: 700;
      color: #242424;
      background-color: #f9f9f9;
      border: 2px solid #242424;
      border-radius: 20px;
      cursor: pointer;
      transition: background-color 0.3s, color 0.3s;
    }
  
    .submit-comment:hover {
      background-color: #242424;
      color: #fff;
    }
  
    .submit-comment:disabled {
      background-color: #e0e0e0;
      color: #a0a0a0;
      cursor: not-allowed;
    }
  </style>
  