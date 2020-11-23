import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Router, Route, Link } from 'react-router-dom';
import * as Yup from 'yup';

import { authenticationService } from '../services';

class LoginButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }

    render() {
        const { currentUser } = this.state;

        if(currentUser){
            return(
                <div className="nav-item avatar dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-55" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false" style={{top: "-5px"}}>
                        <img src="https://mdbootstrap.com/img/Photos/Avatars/img (1).jpg" className="rounded-circle"
                        alt="avatar image" style={{height: '35px'}}></img>
                    </a>
                    <div className="dropdown-menu dropdown-menu-lg-right dropdown-dark"
                        aria-labelledby="navbarDropdownMenuLink-55">
                        <a className="dropdown-item" href="/account">Mon compte</a>
                        <a className="dropdown-item" href="/account">Mes commandes</a>
                        <a onClick={authenticationService.logout} id="navbar-userlogout" class="dropdown-item">Se déconnecter</a>
                    </div>
                </div>
            )
        }
        else{
            return(
                <a className="nav-link waves-effect" href="/login">Login</a>
            )
        }
    }
}

export { LoginButton }; 