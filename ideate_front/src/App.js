import './App.css';
import 'fontsource-roboto';
import Navbar from './components/Navbar';
import LogIn from './components/LogIn';
import React, {useEffect, useState} from 'react'
import { Route, Switch, Redirect} from 'react-router-dom'
import { useSelector } from "react-redux";
import store from './store'
import { loadUser } from './actions/authActions'
import SignUp from './components/SignUp';
import Home from './components/Home'
import CreateProfile from './components/CreateProfile'
import NewIdea from './components/NewIdea'
import Topics from './components/Topics'
import TopicPage from './components/TopicPage'



function App() {
    const profile_name = localStorage.getItem("profile_name")
    console.log(profile_name)
    const showCreateProfile = (profile_name === "undefined" || profile_name === "null")
    console.log("show = ", showCreateProfile)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated) 
    const userLoading = useSelector(state => state.auth.isLoading)

    useEffect(() => {
        store.dispatch(loadUser())
    }, [])
    

    const authPages = (
        <>
            <Route path="/signup" component={SignUp} />
            <Route exact path="/" component={LogIn} />
        </>
    );

    const protectedPages = (
        <>
            <Route exact path="/" component={Home} />
            <Route exact path="/createprofile" component={CreateProfile} />
            <Route path="/idea" component={NewIdea} />
            <Route exact path="/topic" component={Topics} />
            <Route path="/topic/:topic_id" component={TopicPage} />
            {showCreateProfile &&
                <Redirect to="/createprofile" />
            }
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
