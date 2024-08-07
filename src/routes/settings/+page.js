export async function load({ fetch }) {
    const response = await fetch('http://localhost:8000/settings/api/user/');
    const userData = await response.json();
    
    if (response.ok) {
      return {
          user: userData
      };
    } else {
      return {
          user: null
      };
    }
  }
  