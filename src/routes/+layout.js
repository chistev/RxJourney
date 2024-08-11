export async function load({ fetch }) {
    try {
      console.log('Fetching admin status from API...');
  
      const adminResponse = await fetch('http://localhost:8000/check-admin-status/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      console.log('Response Status:', adminResponse.status);
      const adminData = await adminResponse.json();
  
      console.log('Fetched Data:', adminData);
  
      // Fetch posts from API
      const postsResponse = await fetch('http://localhost:8000/home/post_list/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      if (!postsResponse.ok) {
        throw new Error('Failed to fetch posts');
      }
  
      const postsData = await postsResponse.json();
  
      return {
        isAdmin: adminData.is_admin,
        isAuthenticated: adminData.is_authenticated,
        posts: postsData, // Pass posts to the page
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        isAdmin: false,
        isAuthenticated: false,
        posts: [], // Return an empty array if there's an error
      };
    }
  }
  