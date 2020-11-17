import React, { useEffect} from 'react'
import {Link} from 'react-router-dom';
import './Navbar.css';
import {logOut} from '../actions/authActions'
import { useDispatch, useSelector } from "react-redux";
import store from '../store'
import { loadUser} from '../actions/authActions'

export default function Navbar() {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated) 
    
    return (
        <header className="Nav-header">
            <h1 className="Nav-name">Ideate</h1>
            {isAuthenticated &&
                <div>
                    <Link className="nav-items" to="/idea">Idea</Link>
                    <Link className="nav-items" to="/topics">Topics</Link>
                    <h3 className="nav-items" onClick={() => dispatch(logOut)}>Log Out</h3>
                </div>    
            }
            
        </header>
    )

}
