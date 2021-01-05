import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Signup.css';


function Signup() {

    const history = useHistory();
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        console.log("imageUrl",imageUrl)
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name,
                username,
                password,
                email,
                image: imageUrl
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    history.push("/login")
                }
        }).catch(error => console.log(error))
    }, [imageUrl])

    const postData = (e) => {
        e.preventDefault()
        if (!image) {
            console.log("No Image")
            fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    name,
                    username,
                    password,
                    email,
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        console.log(data.error)
                    } else {
                        history.push("/login")
                    }
            }).catch(error => console.log(error))
        } else {
            e.preventDefault();
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
                    setImageUrl(data.url)
                }).catch((err) => {
                    console.log(err)
                })
        }
    }

    


    return (
        <div className="signup">
            <div className="signUp__form">
                <h1>Instagram</h1>
                <h4>Sign up to see photos and videos from your friends.</h4>
                <form>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange= { (e) => setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange= { (e) => setName(e.target.value)}
                    />
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange= { (e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange= { (e) => setPassword(e.target.value)}
                    />
                    <button onClick={postData}>Sign up</button>
                </form>
            </div>
            <div className="login__form">
                <p>Have an account?
                    <Link to="/login" style={{ marginLeft: "10px", cursor:"pointer", color:"#1589ff", textDecoration:"none"}}>
                        Log in
                    </Link></p>
            </div>
        </div>
    )
}

export default Signup
