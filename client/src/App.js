import './App.css';
import Login from './Components/Login/Login';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Signup from './Components/Signup/Signup';
import Profile from './Components/Profile/Profile';
import Post from './Components/Post/Post';

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
        {/* </Switch> */}
        {/* <Switch> */}
        <Switch>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>
          <Route path="/profile">
            <Header />
            <Profile />
          </Route>
          <Route path="/post">
            <Header />
            <Post />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
