import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import { CLEAR_USERS, GET_REPOS, GET_USER, SEARCH_USERS, SET_LOADING } from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    };

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    const searchUsers = async userString => {
        setLoading();
        const userResponse = await axios.get(`https://api.github.com/search/users?q=${userString}&client_id=${githubClientId}&client_secret=${githubClientSecret}`);
        dispatch({
            type: SEARCH_USERS,
            payload: userResponse.data.items
        })
    }

    const clearUsers = () => dispatch({
        type: CLEAR_USERS
    });

    const setLoading = () => dispatch({ type: SET_LOADING });

    const getUser = async userName => {
        setLoading();
        const userResponse = await axios.get(`https://api.github.com/users/${userName}?client_id=${githubClientId}&client_secret=${githubClientSecret}`);
        dispatch({
            type: GET_USER,
            payload: userResponse.data
        });
    }


    const getRepos = async userName => {
        setLoading();
        const reposResponse = await axios.get(`https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`);
        dispatch({
            type: GET_REPOS,
            payload: reposResponse.data
        })
    }


    return <GithubContext.Provider value={{ users: state.users, user: state.user, repos: state.repos, loading: state.loading, searchUsers, clearUsers, getUser, getRepos }}>
        {props.children}
    </GithubContext.Provider>
}

export default GithubState;