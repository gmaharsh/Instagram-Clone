import React from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

function Signup() {
    return (
        <div className="signup">
            <div className="signup__form">
                <h1>Instagram</h1>
                <h4>Sign up to see photos and videos from your friends.</h4>
                <form>
                    <input
                        type="text"
                        placeholder="Email"
                    />
                    <input
                        type="text"
                        placeholder="Full Name"
                    />
                    <input
                        type="text"
                        placeholder="Username"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                    />
                    <button>Sign up</button>
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
