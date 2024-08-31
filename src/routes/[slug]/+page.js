export async function load({ fetch, params }) {
    const { slug } = params;
  
    try {
        const response = await fetch(`https://rxjourneyserver.pythonanywhere.com/home/posts/${slug}/`, {
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
  
        // Return the post directly to the page component
        return { post };
    } catch (error) {
        console.error('Error fetching post:', error);
        return { post: null };
    }
}
