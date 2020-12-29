import React from 'react';
import './Post.css';

function Post() {
    return (
        <div className="post">
            <h4>Post an Image</h4>
            <div className="post__form">
            <form>
                <input
                    type="text"
                    placeholder="Title"
                />
                <input
                    type="text"
                    placeholder="Body"
                />
                <input
                    type="file"
                    placeholder="Title"
                />
                
                <button type="submit">Add a post</button>
            </form>
            </div>
        </div>
    )
}

export default Post
