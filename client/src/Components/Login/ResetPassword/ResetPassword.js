import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './ResetPassword.css';


function ResetPassword() {
    const history = useHistory();
    const [email, setEmail] = useState("");

    const resetPassword = (e) => {
        console.log(email)
        e.preventDefault()
        fetch("/reset-password", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email,
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
                            placeholder="Email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button onClick={resetPassword}>Reset Password</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;
