// import config from 'config';
import { authHeader, handleResponse } from '../helpers';
import { api_url } from './apiurl';

// const api_url = "http://localhost:3000"

export const userService = {
    getAll,
    getUserProfile
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${api_url}/api/items`, requestOptions).then(handleResponse);
}

function getUserProfile() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${api_url}/api/get-me`, requestOptions).then(handleResponse);
}