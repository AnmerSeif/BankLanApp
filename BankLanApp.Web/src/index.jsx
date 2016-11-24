"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, browserHistory, Redirect} from 'react-router';
import {Navbar} from './components/Navbar/Navbar.jsx';
import {LanKalkulator} from './components/LanKalkulator/LanKalkulator.jsx';
import {Soknader} from './components/Soknader/Soknader.jsx';
import {FinnerIkkeSiden} from './FinnerIkkeSiden.jsx';

class HeleSiden extends React.Component{
    render(){
        return (
            <div>
                <Navbar/>
                <div className="container">
                    {this.props.children}
                </div>
            </div>);
    }
};

ReactDOM.render((
    <Router history={browserHistory}>
        <Route component={HeleSiden}>
            <Redirect from='/' to='/lanKalkulator' />
            <Route path='lanKalkulator' component={LanKalkulator} />
            <Route path='soknader' component={Soknader} />
        </Route>
        <Route path="*" component={FinnerIkkeSiden} />
    </Router>
    ),document.getElementById('root')
);