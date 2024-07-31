  <style>
    .navbar-brand {
      font-family: "medium-content-sans-serif-font", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      font-weight: bolder;
      font-size: 26px;
      color: #191919;
    }
  
    .search-box {
      display: flex;
      align-items: center;
      background-color: #f9f9f9;
      padding: 0.5rem;
      border-radius: 5px;
    }
  
    .search-input {
      border: none;
      outline: none;
      background-color: #f9f9f9;
      font-size: 16px;
      color: #191919;
      padding-left: 0.5rem;
    }
  
    .search-icon {
      color: #191919;
      font-size: 16px;
    }
  
    .sign-up {
      background-color: green !important; /* Use !important to override any conflicting styles */
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-weight: 400;
      font-size: 13px;
      line-height: 20px;
    }
  
    .sign-up:hover {
      background-color: darkgreen; /* Darker green on hover */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add shadow */
    }
  
    .profile-icon {
      font-size: 1.5rem;
      transition: all 0.3s ease; /* Smooth transition for hover effects */
    }
  
    .profile-icon:hover {
      color: white;
      background-color: #191919; /* Dark background circle */
      border-radius: 50%;
      padding: 0.25rem; /* Add padding to create circle effect */
    }
  </style>
  
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <a class="navbar-brand" href="/">RxJourney</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="d-flex align-items-center mx-auto mx-lg-0">
          <div class="search-box me-3 d-none d-lg-flex">
            <i class="bi bi-search search-icon"></i>
            <input type="text" class="search-input" placeholder="Search">
          </div>
        </div>
        <ul class="navbar-nav ms-auto d-flex align-items-center">
          <li class="nav-item">
            <a class="nav-link d-flex align-items-center me-3" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">
              <i class="bi bi-pencil-square"></i> Write
            </a>
          </li>
          <li class="nav-item">
            <button class="btn sign-up me-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Sign up</button>
          </li>
          <li class="nav-item">
            <a class="nav-link me-3" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">Sign in</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/profile">
              <i class="bi bi-person-circle profile-icon"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  