import { subscriberCount } from '../stores/subscriberStore.js'

export async function load({ fetch }) {
  try {
    console.log('Fetching posts from API...');
    const postsResponse = await fetch('https://rxjourneyserver.pythonanywhere.com/home/post_list/', {
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

    try {
      const countResponse = await fetch('https://rxjourneyserver.pythonanywhere.com/home/subscriber-count/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!countResponse.ok) {
        throw new Error('Failed to fetch subscriber count');
      }

      const countData = await countResponse.json();
      subscriberCount.set(countData.subscriber_count);
    } catch (error) {
      console.error('Error fetching subscriber count:', error);
      subscriberCount.set(0);
    }

    return {
      posts: postsData, 
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    
    return {
      posts: [], // Return an empty array if there's an error
    };
  }
}
