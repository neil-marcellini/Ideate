import './App.css';
import 'fontsource-roboto';
import Navbar from './components/Navbar';
import LogIn from './components/LogIn';
import React, {useEffect} from 'react'
import { Route, Switch, Redirect} from 'react-router-dom'
import { useSelector } from "react-redux";
import store from './store'
import { loadUser } from './actions/authActions'
import SignUp from './components/SignUp';
import Home from './components/Home'
import CreateProfile from './components/CreateProfile'



function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated) 
  const userLoading = useSelector(state => state.auth.isLoading)

  const authPages = (
    <>
      <Route path="/signup" component={SignUp} />
      <Route exact path="/" component={LogIn} />
    </>
  );

  const protectedPages = (
    <>
      <Route exact path="/" component={Home} />
      <Redirect from="/signup" to="/createprofile" />
      <Route exact path="/createprofile" component={CreateProfile} />
    </>
  )

  return (
    <div className="App">
      <Navbar />
      <Switch>
        {!userLoading &&
          <React.Fragment>
            {isAuthenticated
              ? protectedPages
              : authPages
            }
          </React.Fragment>
        }
      </Switch>
    </div>  
  );
}

export default App;
