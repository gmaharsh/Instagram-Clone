import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './NewPassword.css';

function NewPassword() {
    const history = useHistory();
    const [password, setPassword] = useState("");
    const { token } = useParams();
    // console.log(token)
    const newPassword = (e) => {
        e.preventDefault()
        console.log(password)
        fetch("/newpassword", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                password,
                token
            })
        }).then(res => res.json())
            .then(data => {
                if (data) {
                    
                    console.log("data after login:-",data)
                    history.push("/login")
                } 
        }).catch(error => console.log(error))
    }

    return (
        <div className="login">
            <div className="login__image">
                <img src="https://www.instagram.com/static/images/homepage/screenshot4-2x.jpg/b27a108592d8.jpg" alt=""/>
            </div>
            <div className="login__forms">
                <div className="login__form">
                    <h1>Instagram</h1>
                    <form>
                        <input
                            placeholder="Enter New Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={newPassword}>Reset Your Password</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewPassword;
