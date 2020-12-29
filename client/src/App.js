import './App.css';
import Login from './Components/Login/Login';
import {BrowserRouter as Router,Switch,Route, useHistory} from "react-router-dom";
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Signup from './Components/Signup/Signup';
import Profile from './Components/Profile/Profile';
import Post from './Components/Post/Post';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { initialState, reducer } from './reducers/userReducer';

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  useEffect(() => { 
    const user = JSON.parse(localStorage.getItem("user"));
    

    if (user) {
      dispatch({type:"USER", payload:user})
      history.push('/')
    } else {
      history.push('/login')
    }
  },[])
  return (
    <Switch>
      <Route path="/login">
          <Login />
      </Route>
      <Route path="/signup">
          <Signup />
      </Route>
      <Route exact path="/post">
        <Header />
        <Post />
      </Route>
      <Route path="/profile">
          <Header />
          <Profile />
      </Route>
      <Route exact path="/">
        <Header />
        <Home />
      </Route>
    </Switch>
  )
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={{state, dispatch}}>
      <Router>
        <div className="app">
          <Routing />
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
