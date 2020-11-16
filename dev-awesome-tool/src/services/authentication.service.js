import { BehaviorSubject } from 'rxjs';

// import config from 'config';
import { handleResponse } from '../helpers';
import {api_url} from './apiurl';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
// const api_url = "http://localhost:8002"

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    console.log("Fecthing from url=" + JSON.stringify(api_url));

    return fetch(`${api_url}/api-token-auth/`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}
