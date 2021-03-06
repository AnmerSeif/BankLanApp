﻿import React from 'react';
import {Link} from 'react-router';

export class Navbar extends React.Component {
    render(){
        return (
            <div id="min-nav">
                <nav className="navbar navbar-default">
                  <div className="container-fluid">
                    <div className="navbar-header">
                      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                      </button>
                      <Link className="navbar-brand" to="/"><img src={'http://imgh.us/logo-transparent.svg'} /></Link>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                      <ul className="nav navbar-nav">
                        <li><Link to="/lanKalkulator">Låne Kalkulator</Link></li>
                        <li><Link to="/soknader">Søknader</Link></li>
                      </ul>
                    </div>
                  </div>
                </nav>
            </div>
        );
    };
}