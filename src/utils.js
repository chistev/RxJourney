export async function fetchCsrfToken() {
    try {
      const response = await fetch('http://localhost:8000/get-csrf-token/', {
        method: 'GET',
        credentials: 'include'
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch CSRF token');
      }
  
      const data = await response.json();
      return data.csrfToken;
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
    }
  }
  
  export function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return 'Please enter a valid email address.';
    }
    return '';
  }
  
  export async function checkEmail(email, csrfToken) {
    if (!csrfToken) {
      csrfToken = await fetchCsrfToken();
    }
  
    const response = await fetch('http://localhost:8000/check-email/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      credentials: 'include',
      body: JSON.stringify({ email: email }),
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    const data = await response.json();
    return data;
  }
  
  export function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }