import './App.css';
import 'fontsource-roboto';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import React, {useEffect} from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/authActions'


function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={LogIn} />
        </div>
      </Router>
    </Provider>
    
  );
}

export default App;
