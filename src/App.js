import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Search from './components/Search';
import User from './components/User';

const App = () => {
    return (
        <div className="main-app">
            <header className="main-header">
                <h1><Link to="/">React GitHub Project</Link></h1>
            </header>
            <main className="main-content">
                <Switch>
                    <Route exact path="/" component={Search} />
                    <Route path="/user/:username" component={User} />
                </Switch>
            </main>
        </div>
    );
}

export default App;
