<script>
    export let onEdit;
    export let onDelete;
  </script>
  
  <div class="options-menu">
    <button on:click={onEdit}>Edit this response</button>
    <button on:click={onDelete}>Delete</button>
  </div>
  
  <style>
    .options-menu {
      position: absolute;
      top: 100%;
      right: 0;
      background: #fff;
      border: 1px solid #ddd;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
      padding: 5px 0;
      z-index: 10;
    }
  
    .options-menu button {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-weight: 400;
      font-size: 14px;
      color: #191919;
      line-height: 24px;
      margin-bottom: 10px;
      cursor: pointer;
      display: block;
      width: 100%;
      padding: 10px;
      border: none;
      background: #fff;
      text-align: left;
      cursor: pointer;
    }
  
    .options-menu button:hover {
      background: #f0f0f0;
    }
  </style>
  