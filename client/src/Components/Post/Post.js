import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Post.css';

function Post() {
    const history = useHistory();
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");

    useEffect(() => {
        console.log("url:-",url)
        if (url) {
            fetch("/createPost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    caption,
                    image: url,
                })
            }).then(res => res.json())
                .then(data => {
                    if (data) {
                        console.log(data)
                        history.push("/")
                    } else {
                    }
                }).catch(error => console.log(error))
        }
    },[url])
    
    const postDetails = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('file', image)
        formData.append('upload_preset', 'instagram-clone-maharsh');
        formData.append('cloud_name', "instagram-clone-maharsh");
        // console.log(formData)

        fetch("https://api.cloudinary.com/v1_1/instagram-clone-maharsh/image/upload", {
            method: "POST",
            body:formData
        }).then(res => res.json())
            .then(data => {
                // createPost(data.url)
                setUrl(data.url)
            }).catch((err) => {
                console.log(err)
            })
        
    }
    
    

    return (
        <div className="post">
            <h4>Post an Image</h4>
            <div className="post__form">
            <form>
                <input
                    type="text"
                    placeholder="Caption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                        
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <button type="submit" onClick={postDetails}>Add a post</button>
            </form>
            </div>
        </div>
    )
}

export default Post
