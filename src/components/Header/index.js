import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Header extends Component {
    render(){
        return(
            <header className="App-header">
                <h1 className="App-title">Welcome ))</h1>
                <nav>
                    <Link to="/" >Home</Link>
                    <Link to="/search">Search</Link>
                    <Link to="/login">Login</Link>
                </nav>
            </header>
        );
    }
}

export default withRouter(Header);