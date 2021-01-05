import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Login.css';
import UserContext from '../../App';
import { useStateValue } from '../../reducers/StateProvider';
import { actionTypes } from '../../reducers/userReducer';

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [{}, dispatch] = useStateValue();

    const getData = (e) => {
        console.log(email)
        e.preventDefault()
        fetch("/signin", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                password,
                email,
            })
        }).then(res => res.json())
            .then(data => {
                if (data) {
                    // console.log(data)
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user", JSON.stringify(data.user))
                    dispatch({
                        type: actionTypes.SET_USER,
                        user: data.user
                    })
                    console.log("data after login:-",data)
                    history.push("/")
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
                        <input
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={getData}>Sign In</button>
                    </form>
                    <Link to="/reset">
                        <p>Forgot your password?</p>
                    </Link>
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
