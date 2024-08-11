<script>
    export let data;
    import PostIcons from '../../components/PostIcons.svelte';
    import { formatDate } from '../../utils';
    import SupportSection from '../../components/SupportSection.svelte';

    const { post } = data;
</script>

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
</style>

<div class="post-detail-container">
    <div class="post-header">
        <h1>{post.title}</h1>
        <div class="post-date">{formatDate(post.created_at)}</div>
    </div>

    <div class="post-meta-container">
        <PostIcons likes={post.likes} comments={post.comments} />
    </div>

    {#if post.image}
        <img class="post-image" src={post.image} alt={post.title} />
    {/if}

    <div class="post-content">
        <p>{@html post.content}</p>
    </div>

    <PostIcons likes={post.likes} comments={post.comments} />

    <SupportSection />
</div>

