import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
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
                            placeholder="Phone Number"
                            type="text"
                        />
                        <input
                            placeholder="Password"
                            type="password"
                        />
                        <button onClick>Sign In</button>
                    </form>
                    <p>Forgot your password?</p>
                </div>
                <div className="signup__form">
                    <p>Don't have account?</p>
                    <Link to="/signup">
                        <p>Sign up</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login;
