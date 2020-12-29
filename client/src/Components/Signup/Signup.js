import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Signup.css';


function Signup() {

    const history = useHistory();
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const postData = (e) => {
        
        
        e.preventDefault();
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
                    history.push("/signin")
                }
        }).catch(error => console.log(error))
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
                    <Link to="/login">
                        Log in
                    </Link></p>
            </div>
        </div>
    )
}

export default Signup
