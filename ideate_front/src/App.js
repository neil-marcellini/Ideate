import './App.css';
import 'fontsource-roboto';
import Navbar from './components/Navbar';
import LogIn from './components/LogIn';
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch} from 'react-router-dom'
import store from './store'
import { loadUser, signUp } from './actions/authActions'
import SignUp from './components/SignUp';



function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated) 
  if (isAuthenticated) {
    return (
      <div className="App">
        <Navbar />
      </div>  
    );
  }
  else {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={LogIn} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </div>  
    );
  }

}

export default App;
