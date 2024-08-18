<script>
  import PostIcons from '../../components/PostIcons.svelte';
  import { formatDate } from '../../utils';
  import SupportSection from '../../components/SupportSection.svelte';
  import ProfileCard from '../../components/ProfileCard.svelte';
import MorePosts from '../../components/MorePosts.svelte';

import { onDestroy } from 'svelte';
import { postStore } from '../../stores/postStore';

let post;

// Update the store when the data is loaded
const unsubscribe = postStore.subscribe(value => {
  post = value;
  console.log('Post data from store:', post);
});

// Fetch the post data
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
    postStore.set(post); // Update the store with the fetched post

    return { post };
  } catch (error) {
    console.error('Error fetching post:', error);
    return { post: null };
  }
}

onDestroy(() => {
  unsubscribe();
});
</script>



<div class="post-detail-container">
  <div class="post-header">
      <h1>{post.title}</h1>
      <div class="post-date">{formatDate(post.created_at)}</div>
  </div>

  <div class="post-meta-container">
      <PostIcons/>
  </div>

  {#if post.image}
      <img class="post-image" src={post.image} alt={post.title} />
  {/if}

  <div class="post-content">
      <p>{@html post.content}</p>
  </div>

  <PostIcons/>

  <SupportSection />
</div>

<!-- Section with background color change, full-width -->
<div class="secondary-section">
  <div class="secondary-section-container">
      <ProfileCard backgroundColor="#f9f9f9"/>
  </div>

  <!-- Divider line -->
  <div class="divider"></div>

  <MorePosts currentSlug={post.slug} />


  <div class="divider"></div>

  <div class="see-all-button-container">
    <a href="/" class="see-all-button text-decoration-none">See all from Chistev</a>
  </div>
</div>

<style>
.post-detail-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
}

.post-header {
  margin-bottom: 10px;
}

.post-header h1 {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 42px;
  font-weight: 700;
  color: #242424;
  margin: 0;
  line-height: 52px;
}

.post-date {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 400;
  line-height: 20px;
  font-size: 14px;
  color: #6b6b6b;
  margin-bottom: 20px;
}

.post-meta-container {
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 0;
  margin-bottom: 20px;
}

.post-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  margin-bottom: 20px;
}

.post-content {
  font-family: Georgia, Cambria, 'Times New Roman', Times, serif;
  font-weight: 400;
  font-size: 20px;
  color: #242424;
  line-height: 32px;
}

.secondary-section {
  background-color: #f9f9f9;
  padding: 20px;
  margin: 0;
}

.secondary-section-container {
  max-width: 700px;
  margin: 0 auto;
}

.divider {
  border-top: 1px solid #e0e0e0;
  margin: 40px 0;
}
.more-from-heading {
font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
font-size: 18px;
font-weight: 700;
color: #242424;
margin-bottom: 20px;
margin-left: 20px; /* Align with existing content */
}

.see-all-button-container {
text-align: center;
margin-top: 20px;
}

.see-all-button {
font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
font-size: 14px;
font-weight: 700;
color: #242424;
padding: 10px 20px;
border: 2px solid #242424;
border-radius: 20px;
background-color: transparent;
cursor: pointer;
transition: background-color 0.3s, color 0.3s;
}

.see-all-button:hover {
background-color: #242424;
color: #fff;
}
</style>
