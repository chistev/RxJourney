export async function load({ fetch, params }) {
    const { slug } = params;
  
    try {
      const response = await fetch(`http://localhost:8000/home/posts/${slug}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch post');
      }
  
      const post = await response.json();
  
      return { post };
    } catch (error) {
      console.error('Error fetching post:', error);
      return { post: null };
    }
  }
  