import { userStore } from '../stores/userStore.js';

export async function load({ fetch }) {
  try {
    console.log('Fetching admin status from API...');
    
    // Fetch admin status
    const adminResponse = await fetch('http://localhost:8000/check-admin-status/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    
    console.log('Admin Response Status:', adminResponse.status);
    if (!adminResponse.ok) {
      throw new Error('Failed to fetch admin status');
    }
    const adminData = await adminResponse.json();
    
    console.log('Fetched Admin Data:', adminData);
    
    // Fetch posts
    console.log('Fetching posts from API...');
    const postsResponse = await fetch('http://localhost:8000/home/post_list/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    
    console.log('Posts Response Status:', postsResponse.status);
    if (!postsResponse.ok) {
      throw new Error('Failed to fetch posts');
    }
    const postsData = await postsResponse.json();
    
    console.log('Fetched Posts Data:', postsData);
    
    // Update userStore with fetched data
    console.log('Updating userStore with fetched data...');
    userStore.set({
      isAdmin: adminData.is_admin,
      isAuthenticated: adminData.is_authenticated,
      username: adminData.username,
    });
    
    return {
      posts: postsData, // Pass posts to the page
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    
    // Update userStore in case of error
    console.log('Resetting userStore due to error...');
    userStore.set({
      isAdmin: false,
      isAuthenticated: false,
      username: '',
    });
    
    return {
      posts: [], // Return an empty array if there's an error
    };
  }
}
