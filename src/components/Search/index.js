import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'

import Header from '../Header';

class Search extends Component {

    constructor(props) {
        super(props);

        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        let username = '';
        if ( params.get('username') ) {
            username = params.get('username');
        }

        this.state = {
            search: username,
            repoFields: [],
        };
    }

    componentWillMount(){
        if( this.state.search ) {
            //This behavior for cases when we have username value in query string
            //for example, we used back arrow in browser
            //or pasted string manually
            this.githubDataGetter();
        }
    }

    githubDataGetter = () => {
        const username = this.state.search;
        //for autofill when we pushed back arrow)
        this.props.history.push({
            pathname: '/search/',
            search: `?username=${username}`,
        });
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
        this.githubDataGetter();
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

    render() {

        const repoData = this.state.repoFields;

        return (
            <div>
                <Header />
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
        );
    }

}

export default withRouter(Search);