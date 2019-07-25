import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from './Routes';
const browserHistory = createBrowserHistory({basename: '/'});


export default class Main extends Component {
    render() {
        return (
            <Router history={browserHistory} >
                    <Routes />
                </Router>
        );
    }
}

if (document.getElementById('main')) {
    ReactDOM.render(<Main />, document.getElementById('main'));
}
