import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            repoFields: [],
        };
    }

    submitHandler = (e) => {
        e.preventDefault();
        const username = this.state.search;
        const queryURL = `https://api.github.com/users/${username}/repos`;
        const fetchParams = {
            method: 'GET',
        };
        fetch( queryURL, fetchParams )
        .then( response => response.json() )
        .then( result => this.reposHandler(result) )
        .catch( e => console.log(e) );
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
                <form onSubmit={ (e) => this.submitHandler(e)}>
                    <input type="text" onChange={ (e) => this.chandeHandler(e) }></input>
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