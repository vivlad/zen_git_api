import React, {Component} from 'react';

import Header from '../Header';

export default class RepoDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            repoInfo: '',
        };
    }

    componentWillMount(){
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const owner = params.get('owner');
        const repo = params.get('repo');
        const queryURL = `https://api.github.com/repos/${owner}/${repo}`;
        const fetchParams = {
            method: 'GET',
        };
        fetch( queryURL, fetchParams )
        .then( response => response.json() )
        .then( result => this.setState({repoInfo: result}) )
        .catch( e => console.log(e) );
    }

    render(){
        const repoInfo = this.state.repoInfo;

        return(
            <div>
                <Header />
                <div>Repo detais page</div>
                <table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{repoInfo.name}</td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>{repoInfo.description}</td>
                        </tr>
                        <tr>
                            <td>Pushed at</td>
                            <td>{repoInfo.pushed_at}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}