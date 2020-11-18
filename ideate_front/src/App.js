import './App.css';
import 'fontsource-roboto';
import Navbar from './components/Navbar';
import LogIn from './components/LogIn';
import React, {useEffect} from 'react'
import { Route, Switch} from 'react-router-dom'
import { useSelector } from "react-redux";
import store from './store'
import { loadUser } from './actions/authActions'
import SignUp from './components/SignUp';
import Home from './components/Home'



function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated) 
  const userLoading = useSelector(state => state.auth.isLoading)

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/signup" component={SignUp} />
        {!userLoading &&
          <React.Fragment>
            {isAuthenticated
              ? <Route exact path="/" component={Home} />
              : <Route exact path="/" component={LogIn} />
            }
          </React.Fragment>
        }
      </Switch>
    </div>  
  );
}

export default App;
