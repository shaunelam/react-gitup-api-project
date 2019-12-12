import React, { useState } from 'react';

/*
This component displays a form where the user can enter a GitHub username
When they submit the form either by pressing ENTER or clicking the button,
we will use react-router's history.push function to push a new URL to the history.

This will have as an effect to navigate to a new URL, which will display the User component
Why are we doing this instead of using a <Link>? The answer is straightforward, but make sure you understand!!!
*/
const Search = (props) => {

    const [userInput, setUserInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.history.push(`/user/${userInput}`)
    }

    return (
        <div className="search-page">
            <h2>Enter a GitHub username</h2>
            <form onSubmit={handleSubmit}>
                <input value={userInput} onChange={e => { setUserInput(e.target.value)}} className="search-page__input" type="text" />
                <button className="search-page__button">Search</button>
            </form>
        </div>
    );
}

export default Search;
