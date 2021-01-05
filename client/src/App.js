import './App.css';
import Login from './Components/Login/Login';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Signup from './Components/Signup/Signup';
import Profile from './Components/Profile/Profile';
import Post from './Components/Post/Post';
import { useStateValue } from './reducers/StateProvider';
import { useEffect } from 'react';
import { actionTypes } from './reducers/userReducer';
import UserProfile from './Components/Profile/UserProfile/UserProfile';
import SubscribedPost from './Components/Home/SubscribedPost/SubscribedPost';
import ResetPassword from './Components/Login/ResetPassword/ResetPassword';
import NewPassword from './Components/Login/ResetPassword/NewPassword/NewPassword';

function App() {

  const [ {user}, dispatch] = useStateValue()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)
    if (user) {
      dispatch({
        type: actionTypes.SET_USER,
        user: user
      })
    }
  }, [])
  return (
      <Router>
      <div className="app">
        {!user ? (
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/reset">
              <ResetPassword />
            </Route>
          </Switch>
        ) :( 
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/reset-password">
                <Signup />
              </Route>
              <Route path="/reset/:token">
                <NewPassword />
              </Route>
              <Route exact path="/post">
                <Header />
                <Post />
              </Route>
              <Route exact path="/profile">
                <Header />
                <Profile />
              </Route>
              <Route path="/profile/:userId">
                <Header />
                <UserProfile />
              </Route>
              <Route exact path="/">
                <Header />
                <Home />
              </Route>
              <Route path="/myfollowersPost">
                <Header />
                <SubscribedPost />
              </Route>
            </Switch>
          )}
        </div>
      </Router>
  );
}

export default App;
