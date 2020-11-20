import React from 'react'
import {Link} from 'react-router-dom';
import {logOut} from '../actions/authActions'
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles({
    navbar: {
        backgroundColor: "#287eff",
        color: "white",
        width: "100%",
        height: "15%",
        textAlign: "center",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    
    navLinks: {
        padding: "0 1rem",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "40%",
        '& li': {
            padding: "0.5rem",
            color: "white",
            textDecoration: "none",
            listStyle: "none"
        }
    },
    
    navName: {
        padding: "0.5rem",
        fontSize: "300%"
    },
    a: {
        
    }
});

export default function Navbar() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated) 
    
    return (
        <nav className={classes.navbar}>
            <h1 className={classes.navName}>Ideate</h1>
            {isAuthenticated &&
                <ul className={classes.navLinks}>
                    <li><Link to="/idea" style={{fontSize: "2em", textDecoration: "none", color: "white"}}>Idea</Link></li>
                    <li><Link to="/topics" style={{fontSize: "2em", textDecoration: "none", color: "white"}}>Topics</Link></li>
                    <li><h4 onClick={() => dispatch(logOut)}>Log Out</h4></li>
                </ul>    
            }
        </nav>

    )

}
