import React, { Fragment, useEffect, useContext } from 'react'
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { Repos } from '../repos/Repos';
import GithubContext from '../../context/github/githubContext';

export const User = ({ match }) => {
    const githubContext = useContext(GithubContext);

    useEffect(() => {
        githubContext.getUser(match.params.login);
        githubContext.getRepos(match.params.login);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {
        name,
        avatar_url,
        location,
        bio,
        blog,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable,
        company
    } = githubContext.user;

    if (githubContext.loading) return <Spinner />;

    return (
        <div>
            <Link to='/' className='btn btn-search'>Back to Search</Link>
            Hireable:
                {hireable ? (<i className="fas fa-check text-success"></i>) : (<i className="fas fa-times-circle text-danger"></i>)}
            <div className="card grid-2">
                <div className="all-center">
                    <img src={avatar_url} className="round-img" style={{ width: '150px' }} alt="" />
                    <h1>{name}</h1>
                    <p>Location: {location}</p>
                </div>
                <div>
                    {bio && <Fragment><h3>Bio</h3><p>{bio}</p></Fragment>}
                    <a href={html_url} className="btn btn-dark my-1">Visit GitHub Profile</a>
                    <ul>
                        <li>
                            {login && <Fragment>
                                <strong>Username:</strong> {login}
                            </Fragment>}
                        </li>
                        <li>
                            {company && <Fragment>
                                <strong>Company:</strong> {company}
                            </Fragment>}
                        </li>
                        <li>
                            {blog && <Fragment>
                                <strong>Website:</strong> <a href={new URL('https://' + blog)}>{blog}</a>
                            </Fragment>}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="card text-center">
                <div className="badge badge-primary">Followers: {followers}</div>
                <div className="badge badge-success">Following: {following}</div>
                <div className="badge badge-light">Public Repos: {public_repos}</div>
                <div className="badge badge-dark">Public Gists: {public_gists}</div>
            </div>
            <Repos />
        </div>
    );
}

export default User
