import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = (props) => {

    const [user, setUser] = useState({});

    const stats = [
        {
            name: 'Public Repos',
            value: user.public_repos,
            url: `/user/${props.match.params.username}/repos`
        },
        {
            name: 'Followers',
            value: user.followers,
            url: `/user/${props.match.params.username}/followers`
        },
        {
            name: 'Following',
            value: user.following,
            url: `/user/${props.match.params.username}/following`
        }
    ];

    /*
    This method will be called by React after the first render. It's a perfect place to load data with AJAX. This User component gets mounted in the DOM as soon as the URL is /user/:username

    When that happens, react-router will pass a `params` prop containing every parameter in the URL. Here, it's props.match.params. Since we called our route parameter `username`, it's available under props.match.params.username

    We're using it to make an API call to GitHub to fetch the user data for the username in the URL. Once we receive the data -- in the callback -- we put the user data in our state. This will trigger a re-render.
    When `render` gets called again, `user` exists and we get the user info display instead of "LOADING..."
    */
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `https://api.github.com/users/${props.match.params.username}`
            );
            setUser(result.data);
        };

        fetchData();
    }, [props.match.params.username]);


    /*
    This method is used as a mapping function. Eventually this could be factored out to its own component.
    */
    const renderStat = (stat) => {
        return (
            <li key={stat.name} className="user-info__stat">
                <Link to={stat.url}>
                    <p className="user-info__stat-value">{stat.value}</p>
                    <p className="user-info__stat-name">{stat.name}</p>
                </Link>
            </li>
        );
    }

    return !user
        // If the state doesn't have a user key, it means the AJAX didn't complete yet. Simply render a LOADING indicator.
        ? <div className="user-page">LOADING...</div>
        : (
            <div className="user-page">
                <div className="user-info">
                    <Link className="user-info__text" to={`/user/${user.login}`}>
                        <img className="user-info__avatar" src={user.avatar_url} alt={`${user.login} avatar`} />
                        <h2 className="user-info__title">{user.login} ({user.name})</h2>
                        <p className="user-info__bio">{user.bio}</p>
                    </Link>

                    <ul className="user-info__stats">
                        {stats.map(renderStat)}
                    </ul>
                </div>
            </div>
        );
}

export default User;
