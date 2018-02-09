import React, {Component} from 'react';

import Header from '../Header';
import messages from '../../Utils/Messages';

class Login extends Component {

    constructor(props) {
        super(props);

        const isAuth = localStorage.getItem( 'token' ) ? true : false;

        this.state = {
            fields: {
                email: '',
                pass: '',
            },
            isAuth: isAuth,
            mesasge: isAuth ? messages.logged : messages.unlogged,
        }

    }
   

    authHandler = () => {
        const queryURL = 'https://reqres.in/api/register';
        const {email, pass} = this.state.fields;
        if( email && pass ) {
            const fetchParams = {
                method: 'POST',
                body: JSON.stringify({
                    "email": email,
                    "password": pass
                }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
            };
            fetch( queryURL, fetchParams )
            .then( response => response.json() )
            .then( result => this.saveAuthData(result) )
            .catch( e => console.log(e) );
        } else {
            this.setState({
                mesasge: messages.fillBothFields
            });
        }

    }

    saveAuthData = (data) => {
        if( data && data.token && data.token.length ) {
            localStorage.setItem( 'token', data.token );
            this.setState({
                isAuth: true,
                mesasge: messages.logged,
            });
        }
    }

    signoutHandler = () => {
        localStorage.removeItem( 'token' );
        this.setState({
            isAuth: false,
            mesasge: messages.unlogged,
        })
    }

    changeEmailHandler = (e) => {
        this.setState({fields: {...this.state.fields, email: e.target.value} });
    }

    changePassHandler = (e) => {
        this.setState({fields: {...this.state.fields, pass: e.target.value} });
    }

    render() {

        const {email, pass} = this.state.fields;

        return  (
            <div>
                <Header />
                <div>
                    <br/>
                    <br/>
                    <p>{this.state.mesasge}</p>
                    {!this.state.isAuth ? (
                        <div>
                            <label htmlFor="email">Email:</label><br/>
                            <input type="email" name="email" value={email} onChange={this.changeEmailHandler}></input><br/>
                            <label htmlFor="pass">Password:</label><br/>
                            <input type="password" name="pass" value={pass} onChange={this.changePassHandler}></input><br/>
                        </div>
                    ) : (
                        <div>Avatarka</div>
                    ) }
                    <button 
                        disabled={this.state.isAuth}
                        onClick={() => this.authHandler()}
                    >
                    Login
                    </button>
                    <button
                        disabled={!this.state.isAuth}
                        onClick={() => this.signoutHandler()}
                    >
                    Logout
                    </button>
                    <br/>
                    <br/>
                </div>
            </div>
        );
    }
}

export default Login;