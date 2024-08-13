<div class="comment-dropdown mt-5">
    <select class="dropdown">
        <option value="most-relevant">Most Relevant</option>
        <option value="newest">Most Recent</option>
    </select>
</div>

<style>
    .comment-dropdown {
        margin-bottom: 20px;
    }

    .dropdown {
        width: 100%;
        padding: 10px;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 14px;
        font-weight: 500;
        color: #242424;
        border: 2px solid #e0e0e0;
        border-radius: 10px;
        background-color: #f9f9f9;
        cursor: pointer;
        transition: border-color 0.3s, box-shadow 0.3s;
    }

    .dropdown:focus {
        border-color: #242424;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        outline: none;
    }
</style>
