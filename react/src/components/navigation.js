import React from 'react';
import { Link } from 'react-router-dom'
import {app} from "../config/firebase_config"

const Navigation = (props) => {
    function handleClick() {
        app.auth().signOut().then(() => {
            props.updateAuthLogged(false, null, null)
          }, function(error) {
            alert('Sign Out Error', error);
          });
    }

    function buttonsDisplay(logged) {
        let profile_link = "/u/" + props.logged

        if(!logged) {
            return (
                <div>
                    <Link to="/register" className="button is-primary"><strong>Sign up</strong></Link>
                    <Link to="/login" className="button is-light">Log in</Link>
                </div>
            )
        } else {
            return (
                <div>
                    <Link to="/login" onClick={() => handleClick()} className="button is-light">Signout</Link>
                    <div className="dropdown is-hoverable is-right">
                        <div className="dropdown-trigger">
                            <button className="button" aria-haspopup="true" aria-controls="dropdown-menu3">
                            <span className="icon is-small">
                                <i className="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                            </button>
                        </div>
                        <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                            <div className="dropdown-content">
                            <Link to={profile_link}  className="dropdown-item">
                                My Profile
                            </Link>
                            <Link to="/upload" className="dropdown-item">
                                Upload
                            </Link>

                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
            <Link to="/" className="navbar-item">
            <img src="https://bulma.io/images/bulma-logo.png" alt="" width="112" height="28"/>
            </Link>
        </div>

        <div className="navbar-start" id="search-nav">
            <div className="navbar-item">
                <p className="control">
                    <input className="input" type="text" placeholder="Search"/>
                </p>
            </div>
        </div>

        <div className="navbar-end">
            <div className="navbar-item">
                <div className="buttons">
                { buttonsDisplay(props.logged) }
                </div>
            </div>
        </div>
        </nav>
    );
}

export default Navigation;