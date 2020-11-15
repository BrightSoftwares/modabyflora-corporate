// import config from 'config';
import { authHeader, handleResponse } from '../helpers';
import api_url from './apiurl';

// const api_url = "http://localhost:3000"

export const userService = {
    getAll
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${api_url}/users`, requestOptions).then(handleResponse);
}