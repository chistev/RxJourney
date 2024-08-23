export async function load({ fetch }) {
  try {
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
     
    return {
      posts: postsData, // Pass posts to the page
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    
    return {
      posts: [], // Return an empty array if there's an error
    };
  }
}
