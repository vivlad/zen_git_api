import React, {Component} from 'react';
import { withRouter, Link } from 'react-router-dom'

import Header from '../Header';
import SearchHistory from '../SearchHistory';
import messages from '../../Utils/Messages';

class Search extends Component {

    constructor(props) {
        super(props);

        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        let username = '';
        if ( params.get('username') ) {
            username = params.get('username');
        }
        const isAuth = localStorage.getItem( 'token' ) ? true : false;
        const historyItems = localStorage.getItem( 'historyItems' ) ? JSON.parse(localStorage.getItem( 'historyItems' )) : [];

        this.state = {
            isAuth: isAuth,
            search: username,
            repoFields: [],
            historyItems: historyItems,
        };
    }

    componentWillMount(){
        if( this.state.search ) {
            //This behavior for cases when we have username value in query string
            //for example, we used back arrow in browser
            //or pasted string manually
            this.githubGetData();
        }
    }

    githubGetData = (user) => {
        const username = user ? user : this.state.search;
        //for autofill when we pushed back arrow)
        this.props.history.push({
            pathname: '/search/',
            search: `?username=${username}`,
        });
        //search history
        if( this.state.historyItems.indexOf( username ) === -1) {
            let newHistoryItems = [...this.state.historyItems, username];// It is need because setState is async!
            this.setState({historyItems: newHistoryItems});
            localStorage.setItem( 'historyItems', JSON.stringify( newHistoryItems ) );
        }

        const queryURL = `https://api.github.com/users/${username}/repos`;
        const fetchParams = {
            method: 'GET',
        };
        fetch( queryURL, fetchParams )
        .then( response => response.json() )
        .then( result => this.reposHandler(result) )
        .catch( e => console.log(e) );
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.githubGetData();
    }

    chandeHandler = (e) => {
        this.setState({ search: e.target.value })
    }

    reposHandler = (data) => {
        const repoFields = data.map( repo => {return { url: repo['url'], name: repo['name'] } } );
        this.setState( { repoFields: repoFields } );
    }

    getRepoHandler = ( owner, repo ) => {
        this.props.history.push({
            pathname: '/repo_detail/',
            search: `?owner=${owner}&repo=${repo}`,
        });
    }

    historyItemClickHandler = (username) => {
        this.setState({ search: username });
        this.githubGetData(username);
    }

    clearHistory = () => {
        this.setState({historyItems: []});
        localStorage.removeItem( 'historyItems' );
    }

    render() {

        const repoData = this.state.repoFields;

        return (
            <div>
                <Header />
                {!this.state.isAuth ? (
                    <div>
                        <p>{messages.onlyAuthorizedUsersCanUseIt}</p><br/>
                        <Link to="/login">Login</Link>
                    </div>
                ) 
                : 
                (
                <div>
                    <p>{messages.enterGitUserName}</p>
                    <SearchHistory
                        historyItems={this.state.historyItems}
                        historyItemClickHandler={this.historyItemClickHandler}
                        clearHistory={this.clearHistory}
                    />
                    <form onSubmit={ (e) => this.submitHandler(e)}>
                        <input type="text" onChange={ (e) => this.chandeHandler(e) } value={this.state.search}></input>
                        <button type="submit">Search</button>
                    </form>
                    <div className="resultList">
                        { repoData.length > 0 ?
                            <ul>
                            { repoData.map( (el, key) => (
                                <li
                                    key={key}
                                    link={el.url}
                                    onClick={() => this.getRepoHandler(this.state.search, el.name)}
                                >
                                {el.name}
                                </li>
                            ) ) }
                            </ul>
                        :
                            <div>Nothing found</div>
                        }
                    </div>
                </div>
                )
                }

            </div>
        );
    }

}

export default withRouter(Search);