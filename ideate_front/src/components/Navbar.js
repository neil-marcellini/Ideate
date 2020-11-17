import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import './Navbar.css';

export default class Navbar extends Component {
    render() {
        return (
            <header className="Nav-header">
                <h1 className="Nav-name">Ideate</h1>
                <Link className="nav-items" to="/idea">Idea</Link>
                <Link className="nav-items" to="/topics">Topics</Link>
            </header>
        )
    }
}
